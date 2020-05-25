export const config = {
    // API
    apiEndpoint: 'https://api.bobba.biz/api',
    // apiEndpoint: 'http://localhost/api',

    // App
    app: {
        name: 'Bobba',
        url: 'http://localhost:4200',
        maintenance: false,

        swf: 'https://swf.bobba.biz',
        fastFoodApiKey: '2C5A11-8142C4-71B2AE-0BE0EE-59D8AD'
    },

    // WebSocket
    websocket: {
        host: '51.178.200.195',
        port: 1339
    }
};

export const client = {
    swf: `${config.app.swf}/gordon/PRODUCTION-201602082203-712976078/Habbo.swf?t=12328`,
    express: 'https://habbo.st/public/assets/flash/expressInstall.swf',

    vars: {
        'client.allow.cross.domain': '1',
        'client.notify.cross.domain': '1',
        'connection.info.host': 'fr.protected.pw',
        'connection.info.port': '30079',
        'site.url': config.app.url,
        'url.prefix': config.app.url,
        'client.reload.url': `${config.app.url}/hotel`,
        'client.fatal.error.url': `${config.app.url}/fatal`,
        'client.connection.failed.url': `${config.app.url}/failed`,
        'external.override.texts.txt': `${config.app.swf}/gamedata/override/external_flash_override_texts.txt`,
        'external.override.variables.txt': `${config.app.swf}/gamedata/override/external_override_variables.txt`,
        'external.variables.txt': `${config.app.swf}/gamedata/external_variables.txt?t=1337`,
        'external.texts.txt': `${config.app.swf}/gamedata/external_flash_texts.txt`,
        'external.figurepartlist.txt': `${config.app.swf}/gamedata/figuredata.xml`,
        'flash.dynamic.avatar.configuration': `${config.app.swf}/gamedata/figuremap.xml`,
        'productdata.load.url': `${config.app.swf}/gamedata/productdata.xml`,
        'furnidata.load.url': `${config.app.swf}/gamedata/furnidata.xml`,
        'use.sso.ticket': '1',
        'sso.ticket': '',
        'processlog.enabled': '1',
        'client.starting.revolving': "Enten werden geladen...\/Willkommen im Bobba!\/Two plus two is four. Minus one that's three, quick maths!\/Bobba hier, Bobba da...\/Neue Möbel werden geladen...\/Es liegt nicht an dir, sondern an mir.\/10 Stunden später...\/Sind wir schon da?\/Lust auf Tee?\/Psst! Ich versuche hier zu denken!\/Pixel-Universum wird geladen!",
        'flash.client.url': `${config.app.swf}/gordon/PRODUCTION-201602082203-712976078/`,
        'diamonds.enabled': '1',
        'logout.url': `${config.app.url}/logout`,
    },

    params: {
        base: `${config.app.swf}/gordon/PRODUCTION-201602082203-712976078/`,
        allowScriptAccess: 'always',
        wmode: 'opaque'
    }
};
