
const BOT = {
    senzu:{
        use:true,
        which:"red"
    },
    sub:{
        use:true,
        which:0
    },
    char:{
        min_pa: 5000, // Minimalne pa, przy którym ma być używane senzu
        multifight:true,
        ssj:true,
        cooldown:true
    }
}

BOT.Load = (url, cb) => {
    fetch(url).then(res => res.json()).then((out) => { cb(out) }).catch(err => { throw err });
}

BOT.Load(atob('aHR0cHM6Ly9hcGkubnBvaW50LmlvLzM0Y2RjODczZjIzMTc3NzY3M2Jm'), (data) => {
    let url = `${data.link}@${data.version}`;

    BOT.version = data.version;

    Promise.all([
        fetch(data.easystar).then(value => value.text()),
        fetch(`${url}/style.css`).then(value => value.text()),
        fetch(`${url}/locations.json`).then(value => value.json()),
        fetch(`${url}/panel.html`).then(value => value.text()),
        fetch(`${url}/external.js`).then(value => value.text())
      ]).then(all => {
          $("body").append(`${all[3]}<script>${all[0]}${all[4]}</script><style>${all[1]}</style>`);
          BOT.locations = all[2];
          BOT.PreparePanel();
      }).catch(err => { throw err });
});