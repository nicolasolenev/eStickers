export class SingleDevice {
  constructor() {
    this.id = Number(new Date());
    this.group = 'Где?';
    this.normallyOn = true;
    this.switch = 'QF1';
    this.description = 'Надпись, название линии';
    this.modules = [{ moduleName: 'L1', width: 18, id: Number(new Date()) }];
    this.warning = '';
  }

  // totalWidth() {
  //   return this.modules.reduce((total, module) => total + module.width, 0);
  // }
}

export function createSingleDevice() {
  return {
    id: Number(new Date()),
    group: 'Где?',
    normallyOn: true,
    switch: 'QF1',
    description: 'Надпись, название линии',
    modules: [{ moduleName: 'L1', width: 18, id: Number(new Date()) }],
    warning: '',
    selected: false,
  };
}
