export function getLastPathComponent(url:string) {
    if (url) {
      const parts = url.replace(/\\/g, '/').split('/');
      const lastPart = parts[parts.length - 1];
      return lastPart;
    } else {
      return "";
    }
  }