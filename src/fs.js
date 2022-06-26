export function saveProjectToFile(project, name) {
  const signedProject = { ...project, type: 'electrical-stickers' };

  if (typeof name !== 'string') {
    return;
  }

  const link = document.createElement('a');
  link.download = `${name.trim()}.json`;

  const blob = new Blob([JSON.stringify(signedProject)], {
    type: 'text/plain;charset=utf-8',
  });

  link.href = URL.createObjectURL(blob);

  link.click();

  URL.revokeObjectURL(link.href);
}

export function readProject(e, dispatch, fn1, fn2) {
  let file = e.target.files[0];

  if (file) {
    let reader = new FileReader();

    reader.readAsText(file);

    reader.onload = function () {
      try {
        const project = JSON.parse(reader.result);
        if (project.type === 'electrical-stickers') {
          dispatch(fn1({ groups: project.groups }));
          dispatch(fn2({ settings: project.settings }));
        } else {
          throw new Error('Не могу открыть этот файл');
        }
      } catch (err) {
        alert('Неверный формат или файл поврежден');
      }
    };

    reader.onerror = function () {
      console.log(reader.error);
    };
  }
}
