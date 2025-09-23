
export function downloadBlob(res, filenameFallback) {
  const blob = new Blob([res.data], { type: res.headers['content-type'] || 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  const cd = res.headers['content-disposition'];
  const match = cd && /filename="?([^"]+)"?/i.exec(cd);
  a.href = url;
  a.download = match ? match[1] : filenameFallback;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}
