const fs = require('fs');
const path = require('path');
const { Canvas, loadImage, FontLibrary } = require('skia-canvas');

try {
  /*
  registerFont(path.resolve(__dirname, '..', 'SadSystem', 'SadResource', 'fonts', 'DejaVuSans.ttf'), {
    family: 'DejaVu Sans'
  });
  */
  FontLibrary.use("DejaVu Sans", [
    path.resolve(__dirname, '..', 'SadSystem', 'SadResource', 'fonts', 'DejaVuSans.ttf')
  ]);
  console.log('[ping2] Font DejaVu Sans berhasil didaftarkan.');
} catch (err) {
  console.warn('[ping2] Gagal mendaftarkan font, gunakan fallback:', err.message);
}

const tempDir = path.resolve(__dirname, '..', 'tmp');;

const ensureTempDir = () => {
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }
};

const formatBytes = (bytes) => {
  if (bytes === 0) return '0 B';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${['B','KiB','MiB','GiB','TiB'][i]}`;
};

const formatUptime = (sec) => {
  const d = Math.floor(sec / 86400);
  const h = Math.floor((sec % 86400) / 3600);
  const m = Math.floor((sec % 3600) / 60);
  return `${d}d ${h}h ${m}m`;
};

const formatTime = (date) => date.toTimeString().split(' ')[0];

const formatFullDate = (date) => {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const d = String(date.getDate()).padStart(2,'0');
  const m = months[date.getMonth()];
  const y = date.getFullYear();
  return `${d} ${m} ${y} ${formatTime(date)}`;
};

/**
 * @param {Object} data
 * @param {number} data.cpuLoad
 * @param {number[]} data.pingHistory
 * @param {Object} data.sysInfo - hasil getSystemInfo()
 * @param {number} data.cpuCores
 * @param {string} data.hostname
 * @param {string} data.nodeVersion
 * @param {Object} data.diskInfo - { total, used, percent }
 * @returns {Promise<string>} path gambar PNG
 */
async function generateMonitorImage(data) {
  const {
    cpuLoad,
    pingHistory,
    sysInfo,
    cpuCores,
    hostname,
    nodeVersion,
    diskInfo
  } = data;

  ensureTempDir();

  const width = 1200, height = 1600;
  const canvas = new Canvas(width, height);
  const ctx = canvas.getContext('2d');

  const colors = {
    bg: '#0f172a', card: '#1e293b', border: '#334155',
    textPrimary: '#f1f5f9', textSecondary: '#94a3b8',
    cpu: '#ef4444', memory: '#0ea5e9', disk: '#8b5cf6',
    uptime: '#f59e0b', os: '#ec4899', model: '#10b981',
    ping: '#3b82f6', packages: '#ec4899', gpu: '#8b5cf6',
    node: '#10b981', critical: '#ef4444', warning: '#f59e0b', good: '#10b981'
  };

  const roundRect = (x, y, w, h, r) => {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  };

  const truncateText = (text, maxWidth, font = '600 20px "DejaVu Sans", Arial, sans-serif') => {
    ctx.save();
    ctx.font = font;
    let w = ctx.measureText(text).width;
    const ellipsis = '…';
    const ellipsisWidth = ctx.measureText(ellipsis).width;
    if (w <= maxWidth) { ctx.restore(); return text; }
    while (w >= maxWidth - ellipsisWidth) {
      text = text.slice(0, -1);
      w = ctx.measureText(text).width;
    }
    ctx.restore();
    return text + ellipsis;
  };

  const drawCard = async (x, y, w, h, title, iconSvg, cardData, color) => {
    ctx.fillStyle = colors.card;
    ctx.strokeStyle = colors.border;
    ctx.lineWidth = 1;
    roundRect(x, y, w, h, 16);
    ctx.fill();
    ctx.stroke();

    let icon;
    try {
      icon = await loadImage(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(iconSvg)}`);
    } catch (e) {
      icon = new Canvas(28, 28);
      const ictx = icon.getContext('2d');
      ictx.fillStyle = color;
      ictx.fillRect(0, 0, 28, 28);
    }
    ctx.drawImage(icon, x + 20, y + 18, 28, 28);

    ctx.fillStyle = colors.textSecondary;
    ctx.font = '600 16px "DejaVu Sans", Arial, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(title, x + 60, y + 38);

    if (cardData.progress !== undefined) {
      const progressText = String(cardData.progress);
      ctx.font = '700 36px "DejaVu Sans", Arial, sans-serif';
      ctx.fillStyle = colors.textPrimary;
      ctx.textBaseline = 'alphabetic';
      ctx.fillText(progressText, x + 25, y + 90);
      const percentWidth = ctx.measureText(progressText).width;
      ctx.font = '700 20px "DejaVu Sans", Arial, sans-serif';
      ctx.fillStyle = colors.textSecondary;
      ctx.fillText('%', x + 25 + percentWidth + 2, y + 90);
      ctx.font = '500 14px "DejaVu Sans", Arial, sans-serif';
      ctx.fillText(cardData.subtext, x + 25, y + 115);

      const p_width = w - 50, p_x = x + 25, p_y = y + 130;
      ctx.fillStyle = '#334155';
      roundRect(p_x, p_y, p_width, 8, 4);
      ctx.fill();
      if (cardData.progress > 0) {
        ctx.fillStyle = color;
        roundRect(p_x, p_y, (p_width * cardData.progress) / 100, 8, 4);
        ctx.fill();
      }
      const statusColor = cardData.progress > 80 ? colors.critical : cardData.progress > 60 ? colors.warning : colors.good;
      ctx.fillStyle = statusColor;
      ctx.beginPath();
      ctx.arc(x + w - 25, y + 25, 8, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.font = '600 20px "DejaVu Sans", Arial, sans-serif';
      ctx.fillStyle = colors.textPrimary;
      ctx.fillText(truncateText(cardData.text, w - 50, ctx.font), x + 25, y + 95);
      ctx.fillStyle = colors.good;
      ctx.beginPath();
      ctx.arc(x + w - 25, y + 25, 8, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const drawPingChart = (x, y, w, h, data, color) => {
    ctx.fillStyle = colors.card;
    ctx.strokeStyle = colors.border;
    roundRect(x, y, w, h, 16);
    ctx.fill();
    ctx.stroke();

    const p = { t:40, r:40, b:40, l:50 };
    const cW = w - p.l - p.r, cH = h - p.t - p.b, cX = x + p.l, cY = y + p.t;
    const valid = data.filter(d => d >= 0);
    const maxVal = Math.max(100, Math.ceil(Math.max(...valid, 0) / 50) * 50);

    ctx.font = '600 16px "DejaVu Sans", Arial, sans-serif';
    ctx.fillStyle = colors.textPrimary;
    ctx.textAlign = 'left';
    ctx.fillText("Network Latency", x + 20, y + 28);
    ctx.font = '700 20px "DejaVu Sans", Arial, sans-serif';
    ctx.fillStyle = color;
    ctx.textAlign = 'right';
    ctx.fillText(`${data[data.length-1]} ms`, x + w - p.r, y + 28);

    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.font = '500 12px "DejaVu Sans", Arial, sans-serif';
    ctx.fillStyle = colors.textSecondary;
    ctx.textAlign = 'right';
    for (let i = 0; i <= 4; i++) {
      const gridY = cY + (i/4)*cH;
      const value = maxVal - (i/4)*maxVal;
      ctx.fillText(Math.round(value), cX - 10, gridY + 4);
      ctx.beginPath();
      ctx.moveTo(cX, gridY);
      ctx.lineTo(cX + cW, gridY);
      ctx.stroke();
    }
    ctx.textAlign = 'center';
    const xLabels = ['-60s','-45s','-30s','-15s','Now'];
    for (let i = 0; i < xLabels.length; i++) {
      const lx = cX + (i/(xLabels.length-1))*cW;
      ctx.fillText(xLabels[i], lx, cY + cH + 20);
    }

    const points = data.map((d,i) => ({
      x: cX + (i/(data.length-1))*cW,
      y: d < 0 ? cY + cH + 10 : cY + cH - ((d/maxVal)*cH)
    }));
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 0; i < points.length-1; i++) {
      const xc = (points[i].x + points[i+1].x)/2;
      const yc = (points[i].y + points[i+1].y)/2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.save();
    roundRect(x, y, w, h, 16);
    ctx.clip('nonzero');
    const grad = ctx.createLinearGradient(0, cY, 0, cY+cH);
    grad.addColorStop(0, color+'80');
    grad.addColorStop(1, color+'10');
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
    ctx.lineTo(points[points.length-1].x, cY+cH);
    ctx.lineTo(cX, cY+cH);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();
  };

  // ── MULAI GAMBAR ──
  const headerHeight = 100;
  const headerGradient = ctx.createLinearGradient(0, 0, width, 0);
  headerGradient.addColorStop(0, '#0f172a');
  headerGradient.addColorStop(1, '#1e293b');
  ctx.fillStyle = headerGradient;
  ctx.fillRect(0, 0, width, headerHeight);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px "DejaVu Sans", Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('VPS SERVER MONITOR', width/2, 50);
  ctx.fillStyle = colors.textSecondary;
  ctx.font = '500 18px "DejaVu Sans", Arial, sans-serif';
  ctx.fillText(`Real-time performance report for ${hostname}`, width/2, 85);

  ctx.fillStyle = colors.bg;
  ctx.fillRect(0, headerHeight, width, height - headerHeight);

  const overviewY = headerHeight + 20, overviewH = 150;
  ctx.fillStyle = colors.card;
  roundRect(50, overviewY, width-100, overviewH, 16);
  ctx.fill();
  ctx.fillStyle = colors.textPrimary;
  ctx.font = '600 20px "DejaVu Sans", Arial, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('System Overview', 70, overviewY+35);
  ctx.fillStyle = colors.textSecondary;
  ctx.font = '500 16px "DejaVu Sans", Arial, sans-serif';
  ctx.fillText(`OS: ${sysInfo.os}`, 70, overviewY+70);
  ctx.fillText(`CPU: ${cpuCores} cores`, 70, overviewY+100);
  ctx.fillText(`Uptime: ${formatUptime(sysInfo.uptime)}`, 70, overviewY+130);
  ctx.fillStyle = cpuLoad < 80 ? colors.good : colors.critical;
  ctx.font = '600 16px "DejaVu Sans", Arial, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText(cpuLoad < 80 ? 'Operational' : 'Critical', width-70, overviewY+35);
  ctx.fillStyle = colors.textPrimary;
  ctx.fillText(`Last Ping: ${pingHistory[pingHistory.length-1] > 0 ? pingHistory[pingHistory.length-1]+'ms' : 'Timeout'}`, width-70, overviewY+70);
  ctx.fillText(`Updated: ${formatTime(new Date())}`, width-70, overviewY+100);

  const cardW = 340, cardH = 180, gap = 25, startX = 50, startY = overviewY + overviewH + 40;

  const icons = {
    cpu: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${colors.cpu}"><path d="M6 18H18V6H6V18ZM14 20H10V22H8V20H5C4.44772 20 4 19.5523 4 19V16H2V14H4V10H2V8H4V5C4 4.44772 4.44772 4 5 4H8V2H10V4H14V2H16V4H19C19.5523 4 20 4.44772 20 5V8H22V10H20V14H22V16H20V19C20 19.5523 19.5523 20 19 20H16V22H14V20ZM8 8H16V16H8V8Z"/></svg>`,
    mem: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 10H21M3 14H21M5 18H19M5 6H19M5 10V14M19 10V14" stroke="${colors.memory}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    disk: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="${colors.disk}" stroke-width="1.5"/><path d="M12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5 9.51472 14.4853 7.5 12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5Z" stroke="${colors.disk}" stroke-width="1.5"/></svg>`,
    model: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 5.5H21M3 11.5H21M3 17.5H21" stroke="${colors.model}" stroke-width="1.5" stroke-linecap="round"/><rect x="3" y="3" width="18" height="18" rx="2" stroke="${colors.model}" stroke-width="1.5"/></svg>`,
    os: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 17.5L12 17.5M8 20.5L12 17.5L8 14.5" stroke="${colors.os}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 6.5H13C13 6.5 15 6.5 15 8.5C15 10.5 13 10.5 13 10.5H4" stroke="${colors.os}" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    pkg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22V12M12 12L22 7M12 12L2 7M22 7V17L12 22M22 7L12 2M12 22L2 17V7L12 2" stroke="${colors.packages}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    gpu: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 7H21M3 12H21M3 17H21" stroke="${colors.gpu}" stroke-width="1.5" stroke-linecap="round"/><rect x="3" y="3" width="18" height="18" rx="2" stroke="${colors.gpu}" stroke-width="1.5"/></svg>`,
    node: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${colors.node}"><path d="M12.8873 1.36173C12.3396 1.03958 11.6604 1.03958 11.1127 1.36173L3.36271 5.92056C2.8282 6.23498 2.5 6.8088 2.5 7.42894V16.571C2.5 17.1912 2.8282 17.765 3.36272 18.0794L5.98596 19.6225C7.31923 20.4068 9 19.4454 9 17.8986V7.74655H7V17.8986L4.5 16.428V7.57193L12 3.16016L19.5 7.57193V16.428L12 20.8398L10.2316 19.7996L9.21757 21.5234L11.1127 22.6382C11.6604 22.9604 12.3396 22.9604 12.8873 22.6382L20.6373 18.0794C21.1718 17.765 21.5 17.1912 21.5 16.571V7.42894C21.5 6.8088 21.1718 6.23498 20.6373 5.92056L12.8873 1.36173ZM13.9999 7.49998C12.6372 7.49998 11.6712 7.85114 11.0504 8.46993C10.4336 9.08484 10.3135 9.80885 10.3135 10.2313C10.3135 10.7862 10.4705 11.289 10.7951 11.7048C11.1076 12.1053 11.5199 12.3537 11.9146 12.5159C12.6341 12.8116 13.5358 12.9086 14.2587 12.9863L14.346 12.9957C15.1774 13.0856 15.7998 13.1627 16.2263 13.3411C16.4189 13.4217 16.4983 13.4954 16.531 13.5379C16.5524 13.5658 16.5934 13.6278 16.5934 13.7977C16.5934 14.0618 16.5027 14.2319 16.2204 14.3926C15.873 14.5904 15.2596 14.7396 14.3368 14.7396C13.4218 14.7396 12.7838 14.5705 12.4192 14.3181C12.1357 14.1218 11.9273 13.821 11.9822 13.1683L9.98923 13.0007C9.88075 14.29 10.3479 15.3167 11.2808 15.9625C12.1325 16.5521 13.2518 16.7396 14.3368 16.7396C15.414 16.7396 16.4289 16.5753 17.2098 16.1307C18.0558 15.6491 18.5934 14.8482 18.5934 13.7977C18.5934 13.2414 18.4381 12.7369 18.1162 12.3184C17.8054 11.9144 17.3942 11.6617 16.9981 11.496C16.2701 11.1915 15.3576 11.0932 14.6296 11.0147H14.6296L14.5609 11.0073C13.7274 10.9172 13.1036 10.8423 12.6748 10.666C12.4808 10.5863 12.4025 10.5137 12.3716 10.4742C12.3528 10.4501 12.3135 10.394 12.3135 10.2313C12.3135 10.1538 12.3363 10.0121 12.4624 9.88637C12.5847 9.76449 12.9618 9.49998 13.9999 9.49998C14.9904 9.49998 15.5674 9.60515 15.897 9.80064C16.1123 9.92838 16.3451 10.1633 16.3761 10.9329L18.3745 10.8524C18.3243 9.60675 17.8694 8.64527 16.9173 8.08051C16.0795 7.58349 15.0094 7.49998 13.9999 7.49998Z"/></svg>`,
    uptime: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="${colors.uptime}" stroke-width="1.5"/><path d="M12 7V12L16 14" stroke="${colors.uptime}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  };

  await drawCard(startX, startY, cardW, cardH, 'CPU Usage', icons.cpu, { progress: cpuLoad, subtext: `${cpuCores} Cores` }, colors.cpu);
  await drawCard(startX+cardW+gap, startY, cardW, cardH, 'Memory', icons.mem, { progress: sysInfo.memoryPercent, subtext: sysInfo.memoryText }, colors.memory);
  await drawCard(startX+(cardW+gap)*2, startY, cardW, cardH, 'Disk', icons.disk, { progress: diskInfo.percent, subtext: `${diskInfo.used} / ${diskInfo.total}` }, colors.disk);

  const row2Y = startY + cardH + gap;
  await drawCard(startX, row2Y, cardW, cardH, 'CPU Model', icons.model, { text: sysInfo.cpu }, colors.model);
  await drawCard(startX+cardW+gap, row2Y, cardW, cardH, 'Operating System', icons.os, { text: sysInfo.os }, colors.os);
  await drawCard(startX+(cardW+gap)*2, row2Y, cardW, cardH, 'Uptime', icons.uptime, { text: formatUptime(sysInfo.uptime) }, colors.uptime);

  const row3Y = row2Y + cardH + gap;
  await drawCard(startX, row3Y, cardW, cardH, 'Packages', icons.pkg, { text: sysInfo.packages }, colors.packages);
  await drawCard(startX+cardW+gap, row3Y, cardW, cardH, 'GPU', icons.gpu, { text: sysInfo.gpu }, colors.gpu);
  await drawCard(startX+(cardW+gap)*2, row3Y, cardW, cardH, 'Node.js Version', icons.node, { text: `v${nodeVersion}` }, colors.node);

  const chartY = row3Y + cardH + gap;
  drawPingChart(startX, chartY, width - startX*2, 280, pingHistory, colors.ping);

  ctx.fillStyle = colors.textSecondary;
  ctx.font = '500 14px "DejaVu Sans", Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`Report generated on ${formatFullDate(new Date())} • Enterprise Monitoring System v2.0`, width/2, height - 30);

  const output = path.join(tempDir, 'vps-status.png');
  //await canvas.saveAs(output);
  const buffer = await canvas.toBuffer('png')

  fs.writeFileSync(output, buffer)
    
  console.log('Saved:', fs.existsSync(output))
  return output;
}

module.exports = { generateMonitorImage };