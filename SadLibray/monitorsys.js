const { exec } = require('child_process');
const { promisify } = require('util');
const fs = require('fs');
const https = require('https');

const execAsync = promisify(exec);

const formatBytes = (bytes) => {
  if (bytes === 0) return '0 B';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${['B','KiB','MiB','GiB','TiB'][i]}`;
};

const getCpuUsage = async () => {
  try {
    const { stdout: s1 } = await execAsync("grep 'cpu ' /proc/stat");
    const f1 = s1.split(/\s+/).slice(1,8).map(Number);
    const total1 = f1.reduce((a,b)=>a+b,0);
    const idle1 = f1[3];
    await new Promise(r=>setTimeout(r,1000));
    const { stdout: s2 } = await execAsync("grep 'cpu ' /proc/stat");
    const f2 = s2.split(/\s+/).slice(1,8).map(Number);
    const total2 = f2.reduce((a,b)=>a+b,0);
    const idle2 = f2[3];
    return Math.max(0, Math.round(100 - ((idle2-idle1)/(total2-total1))*100));
  } catch { return 50; }
};

const getDiskUsage = () => {
  try {
    const stats = fs.statfsSync('/');
    const total = stats.blocks * stats.bsize;
    const free = stats.bfree * stats.bsize;
    const used = total - free;
    return { total: formatBytes(total), used: formatBytes(used), percent: Math.round((used/total)*100) };
  } catch { return { total:'N/A', used:'N/A', percent:0 }; }
};

const getPing = () =>
  new Promise((resolve) => {
    const start = Date.now();
    const req = https.get('https://www.google.com', res => {
      res.resume();
      resolve(Date.now()-start);
    });
    req.on('error', ()=>resolve(-1));
    req.setTimeout(5000, () => { req.destroy(); resolve(-1); });
  });

const getCpuCores = async () => {
  try {
    const { stdout } = await execAsync('nproc');
    return parseInt(stdout.trim()) || 1;
  } catch { return 1; }
};

const getHostname = async () => {
  try {
    const { stdout } = await execAsync('hostname');
    return stdout.trim() || 'Unknown Host';
  } catch { return 'Unknown Host'; }
};

const getNodeVersion = async () => {
  try {
    const { stdout } = await execAsync('node -v');
    return stdout.trim().replace('v','') || 'Unknown';
  } catch { return 'Unknown'; }
};

const getSystemInfo = async () => {
  try {
    const cpuModel = (async () => {
      try {
        const { stdout } = await execAsync("lscpu | grep 'Model name' | cut -d ':' -f2 | xargs");
        return stdout.trim() || 'Unknown CPU';
      } catch {
        try {
          const data = fs.readFileSync('/proc/cpuinfo','utf8');
          const m = data.match(/model name\s*:\s*(.+)/);
          return m ? m[1].trim() : 'Unknown CPU';
        } catch { return 'Unknown CPU'; }
      }
    })();

    const osInfo = (async () => {
      try {
        const { stdout } = await execAsync("cat /etc/os-release | grep '^PRETTY_NAME' | cut -d '=' -f2 | tr -d '\"'");
        return stdout.trim() || 'Unknown OS';
      } catch { return 'Unknown OS'; }
    })();

    const kernel = (async () => {
      try {
        const { stdout } = await execAsync('uname -r');
        return stdout.trim() || 'Unknown Kernel';
      } catch { return 'Unknown Kernel'; }
    })();

    const memoryInfo = (async () => {
      try {
        const { stdout } = await execAsync('free -b | grep Mem');
        const parts = stdout.trim().split(/\s+/);
        const total = parseInt(parts[1]);
        const used = parseInt(parts[2]);
        return { total, used, percent: Math.round((used/total)*100) };
      } catch { return { total:0, used:0, percent:0 }; }
    })();

    const uptimeSec = (async () => {
      try {
        const data = fs.readFileSync('/proc/uptime','utf8');
        return Math.floor(parseFloat(data.split(' ')[0]));
      } catch { return 0; }
    })();

    const packages = (async () => {
      try {
        const [dpkg, rpm, pacman] = await Promise.allSettled([
          execAsync('dpkg --list 2>/dev/null | wc -l'),
          execAsync('rpm -qa 2>/dev/null | wc -l'),
          execAsync('pacman -Q 2>/dev/null | wc -l')
        ]);
        let total = 0;
        [dpkg, rpm, pacman].forEach(r => {
          if (r.status === 'fulfilled') total += parseInt(r.value.stdout.trim()) || 0;
        });
        return total > 0 ? String(total) : 'Unknown';
      } catch { return 'Unknown'; }
    })();

    const gpu = (async () => {
      try {
        const { stdout } = await execAsync("lspci | grep -i vga | cut -d ':' -f3 | xargs");
        return stdout.trim() || 'Unknown GPU';
      } catch { return 'Unknown GPU'; }
    })();

    const [cpu, os, ker, mem, upt, pkg, gp] = await Promise.all([
      cpuModel, osInfo, kernel, memoryInfo, uptimeSec, packages, gpu
    ]);

    return {
      cpu,
      os,
      kernel: ker,
      memoryText: `${formatBytes(mem.used)} / ${formatBytes(mem.total)}`,
      memoryUsed: mem.used,
      memoryTotal: mem.total,
      memoryPercent: mem.percent,
      uptime: upt,
      packages: pkg,
      gpu: gp
    };
  } catch {
    return {
      cpu:'Unknown CPU', os:'Unknown OS', kernel:'Unknown Kernel',
      memoryText:'Unknown', memoryUsed:0, memoryTotal:0, memoryPercent:0,
      uptime:0, packages:'Unknown', gpu:'Unknown GPU'
    };
  }
};

module.exports = {
  getCpuUsage,
  getDiskUsage,
  getPing,
  getCpuCores,
  getHostname,
  getNodeVersion,
  getSystemInfo
};