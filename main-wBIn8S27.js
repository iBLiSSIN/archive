//assuming globalvar is exported
//later when auto dodge: globalvar.game.inputManager.movement.up = true
//zoomhack
function handler(scr){
    globalvar.game.camera.zoom += scr.deltaY/5
    globalvar.game.camera.zoom = globalvar.game.camera.zoom < 0 ? 1 : globalvar.game.camera.zoom;
}
document.documentElement.addEventListener("wheel", handler);
setInterval(function(){
    var current_nametags = document.querySelectorAll(".nametag");
    for(var h = 0; h<current_nametags.length; h++){
        current_nametags[h].remove();
    }
}.bind(this), 100);
//globalvar.game.camera.zoomTween.target._y
window.calcPosOnScreen = function(objpos){
    var zoom = window.globalvar.game.camera.zoomTween.target._y //zoom
    var mypos = window.globalvar.game.activePlayer.position //mypos
    var dx = objpos.x - mypos.x
    var dy = objpos.y - mypos.y
    //zamn 20 is the real scalew
    var x = document.documentElement.clientWidth/2 + dx*zoom*20
    var y = document.documentElement.clientHeight/2 + dy*zoom*20
    return {x: Math.round(x), y: Math.round(y)}
}
//disable scrolling for overflowing nametags
document.body.style.overflow = "hidden";
//aimbot
window.attacking = false;
window.fakemousepos = [0,0];
function distance(a, b){
    return Math.sqrt((a[0]-b[0])**2, (a[1]-b[1])**2);
}
function mouseDown(evt){
    console.log("begin aimbot");
    window.attacking = true;
    window._int = setInterval(function(){
        //spam attacking, basically fully auto
        //somewhat works, maybe switch to mobile
        //window.globalvar.game.inputManager.attacking = true;
        //setTimeout(function(){
        //    window.globalvar.game.inputManager.attacking = false;
        //}, /*must be > tick value*/ 20);
        //ex fires every 200 ms
        //doesnt really work rn
        if(Object.keys(window.enemies).length != 0){
            this._tmp_distances = {};
            Object.keys(window.enemies).forEach(function(e){
                var pos = [window.enemies[e].new.x, window.enemies[e].new.y];
                var realpos = window.calcPosOnScreen(window.enemies[e].new);
                //literal distance from mouse, target closest player to mouse
                realpos = [realpos.x, realpos.y];
                var dist = distance(realpos, window.mousepos);
                this._tmp_distances[dist] = e;
            }.bind(this));
            var distances = Object.keys(this._tmp_distances);
            var _tmp = distances[0];
            distances.forEach(function(e){
                if(parseFloat(e) < _tmp){
                    _tmp = e;
                }
            }.bind(this));
            var target = this._tmp_distances[_tmp];
            target = window.enemies[target];
            //simple linear aim ahead by current velocity, only aims assums bullet travel time = 1 tick, may compensate later
            //add variation with actual distance later, and add gun velocity detection
            var n = window.calcPosOnScreen(target.new);
            var o = window.calcPosOnScreen(target.old)
            window.fakemousepos = [n.x + (n.x - o.x)*5, n.y + (n.y - o.y)*5];
            var div = document.querySelector("#aim-target") || document.createElement("div");
            div.style.zIndex = "999999";
            div.innerText = "X";
            div.style.position = "absolute";
            div.id = "aim-target";
            div.style.color = "red"
            div.style.left = window.fakemousepos[0].toString() + "px";
            div.style.top = window.fakemousepos[1].toString() + "px";
            div.style.pointerEvents = "none";
            document.body.appendChild(div);
        }
    }, 10);
}
window.addEventListener("pointerdown", mouseDown);
function mouseUp(evt){
    console.log("aimbot disengaged")
    window.attacking = false;
    clearInterval(window._int);
}
window.enemies = {};
window.self_coords = [];
window.mousepos = [0,0];
function mouseMove(evt){
    window.mousepos = [event.clientX, event.clientY];
}
document.documentElement.addEventListener("mousemove", mouseMove);
window.addEventListener("pointerup", mouseUp);
var Ri = Object.defineProperty;
var Ti = (a, t, i) => t in a ? Ri(a, t, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: i
}) : a[t] = i;
var s = (a, t, i) => (Ti(a, typeof t != "symbol" ? t + "" : t, i), i);
import "./modulepreload-polyfill-9p4a8sJU.js";
import {
    d as Ii,
    T as Rt,
    S as Pi,
    a as Tt,
    s as Ie,
    b as Ci,
    D as Di,
    C as ve,
    c as Bi,
    $ as d,
    e as It,
    f as gi,
    G as xe,
    R as Ai,
    i as Pt,
    L as Et,
    n as jt,
    g as Fi,
    A as Oi
} from "./vendor-brZMaT-_.js";
import {
    c as Li,
    b as $i
} from "./client-GSuTkTbS.js";
import {
    O as ae,
    I as p,
    V as e,
    R as l,
    H as B,
    r as Ue,
    a as tt,
    C as b,
    M as oe,
    P as ke,
    b as H,
    N as E,
    A as ze,
    G as Me,
    c as we,
    d as fi,
    e as N,
    f as it,
    S as Vi,
    E as Q,
    g as fe,
    h as j,
    i as wi,
    j as de,
    k as _i,
    l as wt,
    m as Ei,
    n as yi,
    L as ji,
    U as _t,
    o as Ht,
    F as Wt,
    p as Gt,
    T as Ut,
    q as ht
} from "./constants-856nBP-E.js";
import {
    n as Hi
} from "./newsPosts-_KNsi3Qu.js";
const lt = new ae([{
    idString: "12g",
    name: "12 gauge",
    itemType: p.Ammo,
    maxStackSize: 20
}, {
    idString: "556mm",
    name: "5.56mm",
    itemType: p.Ammo,
    maxStackSize: 60
}, {
    idString: "762mm",
    name: "7.62mm",
    itemType: p.Ammo,
    maxStackSize: 60
}, {
    idString: "9mm",
    name: "9mm",
    itemType: p.Ammo,
    maxStackSize: 90
}, {
    idString: "127mm",
    name: "12.7mm",
    itemType: p.Ammo,
    maxStackSize: 10,
    hideUnlessPresent: !0
}, {
    idString: "curadell",
    name: "Curadell",
    itemType: p.Ammo,
    maxStackSize: 10,
    hideUnlessPresent: !0
}, {
    idString: "power_cell",
    name: "P.O.W.E.R. cell",
    itemType: p.Ammo,
    maxStackSize: 10,
    ephemeral: !0
}, {
    idString: "bb",
    name: "6mm BB",
    itemType: p.Ammo,
    maxStackSize: 240,
    ephemeral: !0
}]);
var Ct = (a => (a[a.Health = 0] = "Health", a[a.Adrenaline = 1] = "Adrenaline", a))(Ct || {});
const Ke = new ae([{
        idString: "gauze",
        name: "Gauze",
        itemType: p.Healing,
        healType: 0,
        restoreAmount: 15,
        useTime: 3,
        useText: "Applying"
    }, {
        idString: "medikit",
        name: "Medikit",
        itemType: p.Healing,
        healType: 0,
        restoreAmount: 100,
        useTime: 6,
        useText: "Using"
    }, {
        idString: "cola",
        name: "Cola",
        itemType: p.Healing,
        healType: 1,
        restoreAmount: 25,
        useTime: 3,
        useText: "Drinking"
    }, {
        idString: "tablets",
        name: "Tablets",
        itemType: p.Healing,
        healType: 1,
        restoreAmount: 50,
        useTime: 5,
        useText: "Taking"
    }]),
    me = new ae([{
        idString: "1x_scope",
        name: "1x Scope",
        itemType: p.Scope,
        zoomLevel: 48,
        noDrop: !0,
        giveByDefault: !0
    }, {
        idString: "2x_scope",
        name: "2x Scope",
        itemType: p.Scope,
        zoomLevel: 62
    }, {
        idString: "4x_scope",
        name: "4x Scope",
        itemType: p.Scope,
        zoomLevel: 83
    }, {
        idString: "8x_scope",
        name: "8x Scope",
        itemType: p.Scope,
        zoomLevel: 116
    }, {
        idString: "15x_scope",
        name: "15x Scope",
        itemType: p.Scope,
        zoomLevel: 178
    }]),
    Oe = [{
        idString: "frag_grenade",
        name: "Frag Grenade",
        itemType: p.Throwable,
        speedMultiplier: .92,
        cookSpeedMultiplier: .7,
        hitboxRadius: 1,
        impactDamage: 1,
        obstacleMultiplier: 20,
        fuseTime: 4e3,
        cookTime: 150,
        throwTime: 150,
        cookable: !0,
        maxThrowDistance: 96,
        image: {
            position: e.create(60, 43),
            angle: 60
        },
        speedCap: .15,
        detonation: {
            explosion: "frag_explosion"
        },
        animation: {
            pinImage: "proj_frag_pin",
            liveImage: "proj_frag",
            leverImage: "proj_frag_lever",
            cook: {
                leftFist: e.create(2.5, 0),
                rightFist: e.create(-.5, 2.15)
            },
            throw: {
                leftFist: e.create(1.9, -1.75),
                rightFist: e.create(4, 2.15)
            }
        }
    }, {
        idString: "smoke_grenade",
        name: "Smoke Grenade",
        itemType: p.Throwable,
        speedMultiplier: .92,
        cookSpeedMultiplier: .7,
        hitboxRadius: 1,
        impactDamage: 1,
        obstacleMultiplier: 20,
        fuseTime: 2e3,
        cookTime: 150,
        throwTime: 150,
        maxThrowDistance: 96,
        image: {
            position: e.create(60, 43),
            angle: 60
        },
        speedCap: .15,
        detonation: {
            explosion: "smoke_explosion",
            particles: {
                type: "smoke_grenade_particle",
                count: 10,
                deployAnimation: {
                    duration: 4e3,
                    staggering: {
                        delay: 300,
                        initialAmount: 2
                    }
                },
                spawnRadius: 15
            }
        },
        animation: {
            pinImage: "proj_smoke_pin",
            liveImage: "proj_smoke",
            leverImage: "proj_smoke_lever",
            cook: {
                cookingImage: "proj_smoke_nopin",
                leftFist: e.create(2.5, 0),
                rightFist: e.create(-.5, 2.15)
            },
            throw: {
                leftFist: e.create(1.9, -1.75),
                rightFist: e.create(4, 2.15)
            }
        }
    }];

function Wi(a) {
    return a && typeof a == "object" && !Array.isArray(a)
}

function yt(a, ...t) {
    if (!t.length) return a;
    const [i, ...o] = t;
    for (const r in i) {
        const n = r,
            [c, h] = [i[n], a[n]];
        if (Wi(h)) {
            yt(h, c);
            continue
        }
        a[n] = c
    }
    return yt(a, ...o)
}

function Si(a) {
    Object.freeze(a);
    for (const t in a) {
        const i = a[t];
        typeof i == "object" && i !== null && Si(i)
    }
    return a
}
class Gi {
    constructor(t, i) {
        s(this, "callback");
        s(this, "end");
        s(this, "killed", !1);
        this.end = i, this.callback = t
    }
    kill() {
        this.killed = !0
    }
}
var D = (a => (a[a.Player = 0] = "Player", a[a.Obstacle = 1] = "Obstacle", a[a.DeathMarker = 2] = "DeathMarker", a[a.Loot = 3] = "Loot", a[a.Building = 4] = "Building", a[a.Decal = 5] = "Decal", a[a.Parachute = 6] = "Parachute", a[a.ThrowableProjectile = 7] = "ThrowableProjectile", a[a.SyncedParticle = 8] = "SyncedParticle", a))(D || {}),
    Z = (a => (a[a.Join = 0] = "Join", a[a.Joined = 1] = "Joined", a[a.Map = 2] = "Map", a[a.Update = 3] = "Update", a[a.Input = 4] = "Input", a[a.GameOver = 5] = "GameOver", a[a.Pickup = 6] = "Pickup", a[a.Ping = 7] = "Ping", a[a.Spectate = 8] = "Spectate", a[a.Report = 9] = "Report", a[a.MapPing = 10] = "MapPing", a))(Z || {}),
    ce = (a => (a[a.None = 0] = "None", a[a.Melee = 1] = "Melee", a[a.ThrowableCook = 2] = "ThrowableCook", a[a.ThrowableThrow = 3] = "ThrowableThrow", a[a.Gun = 4] = "Gun", a[a.GunAlt = 5] = "GunAlt", a[a.GunClick = 6] = "GunClick", a[a.LastShot = 7] = "LastShot", a))(ce || {}),
    ie = (a => (a[a.Kill = 0] = "Kill", a[a.KillLeaderAssigned = 1] = "KillLeaderAssigned", a[a.KillLeaderDead = 2] = "KillLeaderDead", a[a.KillLeaderUpdated = 3] = "KillLeaderUpdated", a))(ie || {}),
    he = (a => (a[a.Inactive = 0] = "Inactive", a[a.Waiting = 1] = "Waiting", a[a.Advancing = 2] = "Advancing", a))(he || {}),
    $ = (a => (a[a.Single = 0] = "Single", a[a.Burst = 1] = "Burst", a[a.Auto = 2] = "Auto", a))($ || {}),
    L = (a => (a[a.EquipItem = 0] = "EquipItem", a[a.EquipLastItem = 1] = "EquipLastItem", a[a.DropItem = 2] = "DropItem", a[a.SwapGunSlots = 3] = "SwapGunSlots", a[a.Interact = 4] = "Interact", a[a.Reload = 5] = "Reload", a[a.Cancel = 6] = "Cancel", a[a.UseItem = 7] = "UseItem", a[a.TopEmoteSlot = 8] = "TopEmoteSlot", a[a.RightEmoteSlot = 9] = "RightEmoteSlot", a[a.BottomEmoteSlot = 10] = "BottomEmoteSlot", a[a.LeftEmoteSlot = 11] = "LeftEmoteSlot", a))(L || {}),
    se = (a => (a[a.BeginSpectating = 0] = "BeginSpectating", a[a.SpectatePrevious = 1] = "SpectatePrevious", a[a.SpectateNext = 2] = "SpectateNext", a[a.SpectateSpecific = 3] = "SpectateSpecific", a[a.SpectateKillLeader = 4] = "SpectateKillLeader", a[a.Report = 5] = "Report", a))(se || {}),
    De = (a => (a[a.None = 0] = "None", a[a.Reload = 1] = "Reload", a[a.UseItem = 2] = "UseItem", a))(De || {}),
    re = (a => (a[a.Suicide = 0] = "Suicide", a[a.TwoPartyInteraction = 1] = "TwoPartyInteraction", a[a.Gas = 2] = "Gas", a[a.Airdrop = 3] = "Airdrop", a))(re || {});
const Je = {};
for (const a of [...Ke, ...lt, ...me, ...Oe]) {
    let t = 0;
    switch (!0) {
        case (a.itemType === p.Ammo && a.ephemeral):
            t = 1 / 0;
            break;
        case (a.itemType === p.Scope && a.giveByDefault):
            t = 1;
            break
    }
    Je[a.idString] = t
}
Object.freeze(Je);
const Nt = 40,
    qt = Object.freeze([p.Gun, p.Gun, p.Melee, p.Throwable]),
    C = Si({
        protocolVersion: 13,
        gridSize: 32,
        tickrate: Nt,
        msPerTick: 1e3 / Nt,
        maxPosition: 1632,
        player: {
            radius: 2.25,
            nameMaxLength: 16,
            defaultName: "Player",
            defaultHealth: 100,
            maxAdrenaline: 100,
            inventorySlotTypings: qt,
            maxWeapons: qt.length,
            killLeaderMinKills: 3,
            maxMouseDist: 128
        },
        airdrop: {
            fallTime: 8e3,
            flyTime: 3e4,
            damage: 300
        }
    });
var R = (a => (a[a.Ground = 0] = "Ground", a[a.UnderWaterDeathMarkers = 1] = "UnderWaterDeathMarkers", a[a.UnderWaterDeadObstacles = 2] = "UnderWaterDeadObstacles", a[a.UnderWaterObstacles = 3] = "UnderWaterObstacles", a[a.UnderWaterLoot = 4] = "UnderWaterLoot", a[a.UnderwaterGroundedThrowables = 5] = "UnderwaterGroundedThrowables", a[a.UnderwaterPlayers = 6] = "UnderwaterPlayers", a[a.BuildingsFloor = 7] = "BuildingsFloor", a[a.Decals = 8] = "Decals", a[a.DeadObstacles = 9] = "DeadObstacles", a[a.DeathMarkers = 10] = "DeathMarkers", a[a.ObstaclesLayer1 = 11] = "ObstaclesLayer1", a[a.Loot = 12] = "Loot", a[a.GroundedThrowables = 13] = "GroundedThrowables", a[a.ObstaclesLayer2 = 14] = "ObstaclesLayer2", a[a.Bullets = 15] = "Bullets", a[a.Players = 16] = "Players", a[a.ObstaclesLayer3 = 17] = "ObstaclesLayer3", a[a.AirborneThrowables = 18] = "AirborneThrowables", a[a.ObstaclesLayer4 = 19] = "ObstaclesLayer4", a[a.BuildingsCeiling = 20] = "BuildingsCeiling", a[a.ObstaclesLayer5 = 21] = "ObstaclesLayer5", a[a.Emotes = 22] = "Emotes", a[a.Gas = 23] = "Gas", a))(R || {}),
    at = (a => (a[a.Helmet = 0] = "Helmet", a[a.Vest = 1] = "Vest", a))(at || {});
const Ne = new ae([{
        idString: "basic_helmet",
        name: "Basic Helmet",
        itemType: p.Armor,
        armorType: 0,
        level: 1,
        damageReduction: .1
    }, {
        idString: "regular_helmet",
        name: "Regular Helmet",
        itemType: p.Armor,
        armorType: 0,
        level: 2,
        damageReduction: .15
    }, {
        idString: "tactical_helmet",
        name: "Tactical Helmet",
        itemType: p.Armor,
        armorType: 0,
        level: 3,
        damageReduction: .2
    }, {
        idString: "basic_vest",
        name: "Basic Vest",
        itemType: p.Armor,
        armorType: 1,
        level: 1,
        damageReduction: .2
    }, {
        idString: "regular_vest",
        name: "Regular Vest",
        itemType: p.Armor,
        armorType: 1,
        level: 2,
        damageReduction: .35
    }, {
        idString: "tactical_vest",
        name: "Tactical Vest",
        itemType: p.Armor,
        armorType: 1,
        level: 3,
        damageReduction: .45
    }]),
    Pe = new ae([{
        idString: "happy_face",
        name: "Happy Face"
    }, {
        idString: "sad_face",
        name: "Sad Face"
    }, {
        idString: "thumbs_up",
        name: "Thumbs Up"
    }, {
        idString: "thumbs_down",
        name: "Thumbs Down"
    }, {
        idString: "disappointed_face",
        name: "Disappointed Face"
    }, {
        idString: "sobbing_face",
        name: "Sobbing Face"
    }, {
        idString: "angry_face",
        name: "Angry Face"
    }, {
        idString: "heart_face",
        name: "Heart Face"
    }, {
        idString: "joyful_face",
        name: "Joyful Face"
    }, {
        idString: "cool_face",
        name: "Cool Face"
    }, {
        idString: "upside_down_face",
        name: "Upside Down Face"
    }, {
        idString: "picasso_face",
        name: "Picasso Face"
    }, {
        idString: "alien",
        name: "Alien"
    }, {
        idString: "headshot",
        name: "Headshot"
    }, {
        idString: "dab",
        name: "Dab"
    }, {
        idString: "devil_face",
        name: "Devil Face"
    }, {
        idString: "bandaged_face",
        name: "Bandaged Face"
    }, {
        idString: "cold_face",
        name: "Cold Face"
    }, {
        idString: "thinking_face",
        name: "Thinking Face"
    }, {
        idString: "nervous_face",
        name: "Nervous Face"
    }, {
        idString: "sweating_face",
        name: "Sweating Face"
    }, {
        idString: "greedy_face",
        name: "Greedy Face"
    }, {
        idString: "creepy_clown",
        name: "Creepy Clown"
    }, {
        idString: "lying_face",
        name: "Lying Face"
    }, {
        idString: "suroi_logo",
        name: "Suroi Logo"
    }, {
        idString: "aegis_logo",
        name: "AEGIS Logo"
    }, {
        idString: "flint_logo",
        name: "Flint Logo"
    }, {
        idString: "team_equals_ban",
        name: "Team = Ban"
    }, {
        idString: "gg",
        name: "gg"
    }, {
        idString: "ez",
        name: "ez"
    }, {
        idString: "duel",
        name: "Duel"
    }, {
        idString: "question_mark",
        name: "Question Mark"
    }, {
        idString: "skull",
        name: "Skull"
    }, {
        idString: "troll_face",
        name: "Troll Face"
    }, {
        idString: "clueless",
        name: "Clueless"
    }, {
        idString: "pog",
        name: "Pog"
    }, {
        idString: "froog",
        name: "Froog"
    }, {
        idString: "bleh",
        name: "Bleh"
    }, {
        idString: "fire",
        name: "Fire"
    }, {
        idString: "rip",
        name: "RIP"
    }, {
        idString: "monkey",
        name: "Monkey"
    }, {
        idString: "carrot",
        name: "Carrot"
    }, {
        idString: "tomato",
        name: "Tomato"
    }, {
        idString: "egg",
        name: "Egg"
    }, {
        idString: "squid",
        name: "Squid"
    }, {
        idString: "wave",
        name: "Wave"
    }, {
        idString: "melting_face",
        name: "Melting Face"
    }, {
        idString: "grimacing_face",
        name: "Grimacing Face"
    }, {
        idString: "vomiting_face",
        name: "Vomiting Face"
    }, {
        idString: "screaming_face",
        name: "Screaming Face"
    }, {
        idString: "pleading_face",
        name: "Pleading Face"
    }, {
        idString: "sad_smiling_face",
        name: "Sad Smiling Face"
    }, {
        idString: "triumphant_face",
        name: "Triumphant Face"
    }, {
        idString: "questioning_face",
        name: "Questioning Face"
    }, {
        idString: "smirking_face",
        name: "Smirking Face"
    }, {
        idString: "blushing_face",
        name: "Blushing Face"
    }, {
        idString: "saluting_face",
        name: "Saluting Face"
    }, {
        idString: "neutral_face",
        name: "Neutral Face"
    }, {
        idString: "relieved_face",
        name: "Relieved Face"
    }, {
        idString: "monocle_face",
        name: "Monocle Face"
    }, {
        idString: "partying_face",
        name: "Partying Face"
    }, {
        idString: "shushing_face",
        name: "Shushing Face"
    }, {
        idString: "zipper_mouth_face",
        name: "Zipper Mouth Face"
    }, {
        idString: "sighing_face",
        name: "Sighing Face"
    }, {
        idString: "chicken",
        name: "Chicken Dinner"
    }]),
    St = new ae([{
        idString: "bag",
        name: "Bag",
        itemType: p.Backpack,
        level: 0,
        maxCapacity: {
            gauze: 5,
            medikit: 1,
            cola: 2,
            tablets: 1,
            "12g": 15,
            "556mm": 90,
            "762mm": 90,
            "9mm": 120,
            "127mm": 10,
            power_cell: 1 / 0,
            curadell: 1,
            frag_grenade: 3,
            smoke_grenade: 3
        },
        noDrop: !0
    }, {
        idString: "basic_pack",
        name: "Basic Pack",
        itemType: p.Backpack,
        level: 1,
        maxCapacity: {
            gauze: 10,
            medikit: 2,
            cola: 5,
            tablets: 2,
            "12g": 30,
            "556mm": 180,
            "762mm": 180,
            "9mm": 240,
            "127mm": 20,
            power_cell: 1 / 0,
            curadell: 2,
            frag_grenade: 6,
            smoke_grenade: 6
        }
    }, {
        idString: "regular_pack",
        name: "Regular Pack",
        itemType: p.Backpack,
        level: 2,
        maxCapacity: {
            gauze: 15,
            medikit: 3,
            cola: 10,
            tablets: 3,
            "12g": 60,
            "556mm": 240,
            "762mm": 240,
            "9mm": 330,
            "127mm": 40,
            power_cell: 1 / 0,
            curadell: 3,
            frag_grenade: 9,
            smoke_grenade: 9
        }
    }, {
        idString: "tactical_pack",
        name: "Tactical Pack",
        itemType: p.Backpack,
        level: 3,
        maxCapacity: {
            gauze: 30,
            medikit: 4,
            cola: 15,
            tablets: 4,
            "12g": 90,
            "556mm": 300,
            "762mm": 300,
            "9mm": 420,
            "127mm": 80,
            power_cell: 1 / 0,
            curadell: 4,
            frag_grenade: 12,
            smoke_grenade: 12
        }
    }]),
    Ui = [{
        idString: "ak47",
        name: "AK-47",
        itemType: p.Gun,
        ammoType: "762mm",
        ammoSpawnAmount: 90,
        capacity: 30,
        reloadTime: 2.5,
        fireDelay: 100,
        switchDelay: 400,
        speedMultiplier: .92,
        recoilMultiplier: .75,
        recoilDuration: 150,
        fireMode: $.Auto,
        shotSpread: 2,
        moveSpread: 6,
        length: 7.5,
        fists: {
            left: e.create(120, -2),
            right: e.create(45, 0),
            rightZIndex: 4,
            animationDuration: 100
        },
        image: {
            position: e.create(90, 2)
        },
        casingParticles: {
            position: e.create(4, .6)
        },
        ballistics: {
            damage: 14,
            obstacleMultiplier: 1.5,
            speed: .26,
            range: 160
        }
    }, {
        idString: "arx160",
        name: "ARX-160",
        itemType: p.Gun,
        ammoType: "762mm",
        ammoSpawnAmount: 90,
        capacity: 30,
        reloadTime: 2.75,
        fireDelay: 75,
        switchDelay: 400,
        speedMultiplier: .92,
        recoilMultiplier: .75,
        recoilDuration: 145,
        fireMode: $.Auto,
        shotSpread: 5,
        moveSpread: 10,
        length: 6.6,
        fists: {
            left: e.create(98, -2),
            right: e.create(40, 0),
            rightZIndex: 4,
            animationDuration: 100
        },
        image: {
            position: e.create(70, 0)
        },
        casingParticles: {
            position: e.create(4, .6)
        },
        ballistics: {
            damage: 12.25,
            obstacleMultiplier: 1.5,
            speed: .26,
            range: 160
        }
    }, {
        idString: "aug",
        name: "AUG",
        itemType: p.Gun,
        ammoType: "556mm",
        ammoSpawnAmount: 90,
        fireDelay: 70,
        switchDelay: 400,
        speedMultiplier: .92,
        recoilMultiplier: .75,
        recoilDuration: 120,
        fireMode: $.Auto,
        shotSpread: 4,
        moveSpread: 11,
        length: 6.7,
        fists: {
            left: e.create(105, -2),
            right: e.create(40, 0),
            rightZIndex: 4,
            animationDuration: 100
        },
        image: {
            position: e.create(75, -4)
        },
        casingParticles: {
            position: e.create(4, .5)
        },
        capacity: 30,
        reloadTime: 2.25,
        ballistics: {
            damage: 10.5,
            obstacleMultiplier: 1.5,
            speed: .28,
            range: 160
        }
    }, {
        idString: "acr",
        name: "ACR",
        itemType: p.Gun,
        ammoType: "556mm",
        ammoSpawnAmount: 90,
        fireDelay: 72.5,
        switchDelay: 400,
        speedMultiplier: .92,
        recoilMultiplier: .75,
        recoilDuration: 130,
        fireMode: $.Auto,
        shotSpread: 2,
        moveSpread: 7,
        noMuzzleFlash: !0,
        length: 6.2,
        fists: {
            left: e.create(95, -2),
            right: e.create(40, 0),
            rightZIndex: 4,
            animationDuration: 100
        },
        image: {
            position: e.create(75, -1)
        },
        casingParticles: {
            position: e.create(4, .5)
        },
        capacity: 30,
        reloadTime: 3,
        ballistics: {
            damage: 14.5,
            obstacleMultiplier: 1.5,
            speed: .3,
            range: 160,
            tracer: {
                opacity: .5
            }
        }
    }, {
        idString: "m3k",
        name: "M3K",
        itemType: p.Gun,
        ammoType: "12g",
        ammoSpawnAmount: 18,
        capacity: 9,
        reloadTime: .55,
        fireDelay: 700,
        switchDelay: 700,
        speedMultiplier: .92,
        recoilMultiplier: .5,
        recoilDuration: 500,
        fireMode: $.Single,
        shotSpread: 5,
        moveSpread: 7,
        jitterRadius: .5,
        bulletCount: 9,
        length: 7.7,
        fists: {
            left: e.create(105, -3),
            right: e.create(40, 0),
            rightZIndex: 4,
            animationDuration: 100
        },
        image: {
            position: e.create(90, 5)
        },
        casingParticles: {
            position: e.create(4, .6)
        },
        singleReload: !0,
        ballistics: {
            damage: 9,
            obstacleMultiplier: 1,
            speed: .2,
            range: 80
        }
    }, {
        idString: "model_37",
        name: "Model 37",
        itemType: p.Gun,
        ammoType: "12g",
        ammoSpawnAmount: 15,
        capacity: 5,
        reloadTime: .75,
        fireDelay: 900,
        switchDelay: 900,
        speedMultiplier: .92,
        recoilMultiplier: .5,
        recoilDuration: 550,
        fireMode: $.Single,
        shotSpread: 11,
        moveSpread: 14,
        jitterRadius: 1.25,
        bulletCount: 10,
        length: 7.9,
        fists: {
            left: e.create(122, -3),
            right: e.create(45, 0),
            rightZIndex: 4,
            animationDuration: 100
        },
        image: {
            position: e.create(95, 0)
        },
        casingParticles: {
            position: e.create(4.5, .6),
            ejectionDelay: 450,
            velocity: {
                y: {
                    min: 2,
                    max: 5,
                    randomSign: !0
                }
            }
        },
        singleReload: !0,
        ballistics: {
            damage: 10,
            obstacleMultiplier: 1,
            speed: .16,
            range: 48,
            tracer: {
                length: .7
            }
        }
    }, {
        idString: "hp18",
        name: "HP18",
        itemType: p.Gun,
        ammoType: "12g",
        ammoSpawnAmount: 15,
        capacity: 5,
        reloadTime: .725,
        singleReload: !0,
        fireDelay: 300,
        switchDelay: 400,
        speedMultiplier: .92,
        recoilMultiplier: .6,
        recoilDuration: 600,
        fireMode: $.Single,
        bulletCount: 18,
        shotSpread: 15,
        moveSpread: 22,
        jitterRadius: 1.5,
        length: 8,
        fists: {
            left: e.create(120, -1),
            right: e.create(40, 0),
            rightZIndex: 4,
            animationDuration: 100
        },
        image: {
            position: e.create(100, 0)
        },
        casingParticles: {
            position: e.create(4, .6)
        },
        ballistics: {
            damage: 5,
            obstacleMultiplier: .5,
            speed: .12,
            range: 40,
            tracer: {
                length: .5
            }
        }
    }, {
        idString: "flues",
        name: "Flues",
        itemType: p.Gun,
        ammoType: "12g",
        ammoSpawnAmount: 10,
        capacity: 2,
        reloadTime: 2.6,
        fireDelay: 175,
        switchDelay: 250,
        speedMultiplier: .92,
        recoilMultiplier: .8,
        recoilDuration: 100,
        fireMode: $.Single,
        bulletCount: 10,
        shotSpread: 11,
        moveSpread: 14,
        jitterRadius: 1.5,
        length: 6,
        fists: {
            left: e.create(95, -2),
            right: e.create(40, 0),
            rightZIndex: 4,
            animationDuration: 100
        },
        image: {
            position: e.create(75, 0)
        },
        casingParticles: {
            position: e.create(4, .6),
            count: 2,
            spawnOnReload: !0,
            velocity: {
                y: {
                    min: 8,
                    max: 15,
                    randomSign: !0
                }
            }
        },
        ballistics: {
            damage: 10,
            obstacleMultiplier: 1,
            speed: .16,
            range: 48,
            tracer: {
                length: .5
            }
        }
    }, {
        idString: "vepr12",
        name: "Vepr-12",
        itemType: p.Gun,
        ammoType: "12g",
        ammoSpawnAmount: 20,
        capacity: 5,
        reloadTime: 2.4,
        fireDelay: 450,
        switchDelay: 650,
        speedMultiplier: .92,
        recoilMultiplier: .7,
        recoilDuration: 550,
        fireMode: $.Auto,
        shotSpread: 11,
        moveSpread: 14,
        jitterRadius: 1.25,
        length: 7.1,
        bulletCount: 10,
        fists: {
            left: e.create(98, -2),
            right: e.create(40, 0),
            rightZIndex: 4,
            animationDuration: 100
        },
        image: {
            position: e.create(81, 2)
        },
        casingParticles: {
            position: e.create(4.3, .6)
        },
        ballistics: {
            damage: 10,
            obstacleMultiplier: 1,
            speed: .16,
            range: 48,
            tracer: {
                length: .5
            }
        }
    }, {
        idString: "mosin",
        name: "Mosin-Nagant",
        itemType: p.Gun,
        ammoType: "762mm",
        ammoSpawnAmount: 20,
        capacity: 5,
        reloadTime: .85,
        singleReload: !0,
        fireDelay: 900,
        switchDelay: 900,
        speedMultiplier: .92,
        recoilMultiplier: .45,
        recoilDuration: 750,
        fireMode: $.Single,
        shotSpread: 1,
        moveSpread: 2,
        length: 8.7,
        shootOnRelease: !0,
        fists: {
            left: e.create(115, -4),
            right: e.create(40, 0),
            rightZIndex: 4,
            animationDuration: 100
        },
        image: {
            position: e.create(90, 6.5)
        },
        casingParticles: {
            position: e.create(4, .6),
            ejectionDelay: 700
        },
        ballistics: {
            damage: 70,
            obstacleMultiplier: 1,
            speed: .33,
            range: 250,
            tracer: {
                width: 1.4,
                length: 2.5
            }
        }
    }, {
        idString: "tango_51",
        name: "Tango 51",
        itemType: p.Gun,
        ammoType: "762mm",
        ammoSpawnAmount: 20,
        capacity: 5,
        reloadTime: 2.6,
        fireDelay: 900,
        switchDelay: 900,
        speedMultiplier: .92,
        recoilMultiplier: .4,
        recoilDuration: 1e3,
        fireMode: $.Single,
        shotSpread: .3,
        moveSpread: .6,
        length: 8.9,
        shootOnRelease: !0,
        fists: {
            left: e.create(106, -1),
            right: e.create(40, 0),
            rightZIndex: 4,
            animationDuration: 100
        },
        image: {
            position: e.create(90, 5)
        },
        casingParticles: {
            position: e.create(4, .6),
            ejectionDelay: 450
        },
        ballistics: {
            damage: 79,
            obstacleMultiplier: 1,
            speed: .4,
            range: 280,
            tracer: {
                width: 1.6,
                length: 3.5
            }
        }
    }, {
        idString: "barrett",
        name: "Barrett M95",
        itemType: p.Gun,
        ammoType: "127mm",
        ammoSpawnAmount: 20,
        capacity: 5,
        reloadTime: 3.4,
        fireDelay: 1400,
        switchDelay: 900,
        speedMultiplier: .92,
        recoilMultiplier: .3,
        recoilDuration: 1500,
        fireMode: $.Single,
        shotSpread: .5,
        moveSpread: 4,
        length: 9.2,
        shootOnRelease: !0,
        fists: {
            left: e.create(115, -4),
            right: e.create(40, 0),
            rightZIndex: 4,
            animationDuration: 100
        },
        image: {
            position: e.create(90, 4)
        },
        casingParticles: {
            position: e.create(2, .6),
            ejectionDelay: 700
        },
        ballistics: {
            damage: 129,
            obstacleMultiplier: 1,
            speed: .45,
            range: 300,
            tracer: {
                width: 2.5,
                length: 4
            }
        }
    }, {
        idString: "m1895",
        name: "M1895",
        itemType: p.Gun,
        ammoType: "762mm",
        ammoSpawnAmount: 28,
        fireDelay: 375,
        switchDelay: 250,
        speedMultiplier: .92,
        recoilMultiplier: .75,
        recoilDuration: 135,
        fireMode: $.Single,
        shotSpread: 2,
        moveSpread: 5,
        length: 5.1,
        fists: {
            left: e.create(40, 0),
            right: e.create(40, 0),
            leftZIndex: 4,
            rightZIndex: 4,
            animationDuration: 100
        },
        image: {
            position: e.create(70, 0)
        },
        casingParticles: {
            position: e.create(3.5, .5),
            count: 7,
            spawnOnReload: !0,
            velocity: {
                x: {
                    min: -15,
                    max: -4
                },
                y: {
                    min: 5,
                    max: 18,
                    randomSign: !0
                }
            }
        },
        capacity: 7,
        reloadTime: 2.1,
        ballistics: {
            damage: 24.5,
            obstacleMultiplier: 1.5,
            speed: .26,
            range: 160
        },
        dual: {
            leftRightOffset: 1.3,
            fireDelay: 187.5,
            shotSpread: 3,
            moveSpread: 6,
            capacity: 14,
            reloadTime: 4
        }
    }, {
        idString: "g19",
        name: "G19",
        itemType: p.Gun,
        ammoType: "9mm",
        ammoSpawnAmount: 60,
        fireDelay: 110,
        switchDelay: 250,
        speedMultiplier: .92,
        recoilMultiplier: .8,
        recoilDuration: 90,
        fireMode: $.Single,
        shotSpread: 7,
        moveSpread: 14,
        length: 4.7,
        fists: {
            left: e.create(40, 0),
            right: e.create(40, 0),
            leftZIndex: 4,
            rightZIndex: 4,
            animationDuration: 100
        },
        image: {
            position: e.create(65, 0)
        },
        casingParticles: {
            position: e.create(3.5, .5),
            velocity: {
                y: {
                    min: 2,
                    max: 18
                }
            }
        },
        capacity: 15,
        reloadTime: 1.5,
        ballistics: {
            damage: 11.75,
            obstacleMultiplier: 1,
            speed: .14,
            range: 120
        },
        dual: {
            leftRightOffset: 1.3,
            fireDelay: 75,
            shotSpread: 10,
            moveSpread: 18,
            capacity: 30,
            reloadTime: 2.9
        }
    }, {
        idString: "radio",
        name: "Radio",
        itemType: p.Gun,
        summonAirdrop: !0,
        ammoType: "curadell",
        ammoSpawnAmount: 1,
        fireDelay: 500,
        switchDelay: 0,
        speedMultiplier: .92,
        recoilMultiplier: 1,
        recoilDuration: 0,
        fireMode: $.Single,
        shotSpread: 7,
        moveSpread: 14,
        length: 4.7,
        fists: {
            left: e.create(38, -35),
            right: e.create(38, 35),
            leftZIndex: 4,
            rightZIndex: 4,
            animationDuration: 100
        },
        image: {
            position: e.create(65, 35)
        },
        casingParticles: {
            position: e.create(3.5, 1),
            ejectionDelay: 500
        },
        noMuzzleFlash: !0,
        capacity: 1,
        reloadTime: 1.4,
        ballistics: {
            tracer: {
                image: "radio_wave",
                opacity: .8,
                particle: !0,
                zIndex: R.BuildingsCeiling
            },
            damage: 0,
            obstacleMultiplier: 1,
            speed: .01,
            range: 50,
            noCollision: !0
        }
    }, {
        idString: "cz75a",
        name: "CZ-75A",
        itemType: p.Gun,
        ammoType: "9mm",
        ammoSpawnAmount: 64,
        fireDelay: 60,
        switchDelay: 250,
        speedMultiplier: .92,
        recoilMultiplier: .8,
        recoilDuration: 90,
        fireMode: $.Auto,
        shotSpread: 12,
        moveSpread: 19,
        length: 5.1,
        fists: {
            left: e.create(40, 0),
            right: e.create(40, 0),
            leftZIndex: 4,
            rightZIndex: 4,
            animationDuration: 100
        },
        image: {
            position: e.create(70, -1)
        },
        casingParticles: {
            position: e.create(3.5, .5),
            velocity: {
                y: {
                    min: 2,
                    max: 18
                }
            }
        },
        capacity: 16,
        reloadTime: 1.9,
        ballistics: {
            damage: 9,
            obstacleMultiplier: 1,
            speed: .16,
            range: 85
        },
        dual: {
            leftRightOffset: 1.3,
            fireDelay: 30,
            shotSpread: 17,
            moveSpread: 35,
            capacity: 32,
            reloadTime: 3.7
        }
    }, {
        idString: "saf_200",
        name: "SAF-200",
        itemType: p.Gun,
        ammoType: "9mm",
        ammoSpawnAmount: 90,
        capacity: 30,
        reloadTime: 1.8,
        fireDelay: 75,
        burstProperties: {
            shotsPerBurst: 3,
            burstCooldown: 325
        },
        switchDelay: 300,
        speedMultiplier: .92,
        recoilMultiplier: .75,
        recoilDuration: 300,
        fireMode: $.Burst,
        shotSpread: 3,
        moveSpread: 4,
        length: 5.9,
        fists: {
            left: e.create(95, -3),
            right: e.create(40, 0),
            rightZIndex: 4,
            animationDuration: 100
        },
        image: {
            position: e.create(71, 0)
        },
        casingParticles: {
            position: e.create(4, .5)
        },
        ballistics: {
            damage: 15.5,
            obstacleMultiplier: 1,
            speed: .25,
            range: 130
        }
    }, {
        idString: "m16a4",
        name: "M16A4",
        itemType: p.Gun,
        ammoType: "556mm",
        ammoSpawnAmount: 90,
        capacity: 30,
        reloadTime: 2.2,
        fireDelay: 75,
        burstProperties: {
            shotsPerBurst: 3,
            burstCooldown: 325
        },
        switchDelay: 400,
        speedMultiplier: .92,
        recoilMultiplier: .75,
        recoilDuration: 350,
        fireMode: $.Burst,
        shotSpread: 1,
        moveSpread: 2.5,
        length: 8.6,
        fists: {
            left: e.create(120, -3),
            right: e.create(40, 0),
            rightZIndex: 4,
            animationDuration: 100
        },
        image: {
            position: e.create(100, 0)
        },
        casingParticles: {
            position: e.create(3.5, .5)
        },
        ballistics: {
            damage: 21,
            obstacleMultiplier: 1.5,
            speed: .3,
            range: 180
        }
    }, {
        idString: "micro_uzi",
        name: "Micro Uzi",
        itemType: p.Gun,
        ammoType: "9mm",
        ammoSpawnAmount: 96,
        capacity: 32,
        reloadTime: 1.75,
        fireDelay: 40,
        switchDelay: 300,
        speedMultiplier: .92,
        recoilMultiplier: .75,
        recoilDuration: 60,
        fireMode: $.Auto,
        shotSpread: 9,
        moveSpread: 19,
        length: 5.8,
        fists: {
            left: e.create(85, -6),
            right: e.create(40, 0),
            rightZIndex: 4,
            animationDuration: 100
        },
        casingParticles: {
            position: e.create(3.5, .6)
        },
        image: {
            position: e.create(80, 0)
        },
        ballistics: {
            damage: 7.75,
            obstacleMultiplier: 1,
            speed: .16,
            range: 85
        }
    }, {
        idString: "vector",
        name: "Vector",
        itemType: p.Gun,
        ammoType: "9mm",
        ammoSpawnAmount: 99,
        capacity: 33,
        reloadTime: 1.7,
        fireDelay: 35,
        switchDelay: 300,
        speedMultiplier: .92,
        recoilMultiplier: .75,
        recoilDuration: 60,
        fireMode: $.Auto,
        shotSpread: 2,
        moveSpread: 7,
        length: 7.1,
        fists: {
            left: e.create(85, -6),
            right: e.create(40, 0),
            rightZIndex: 4,
            animationDuration: 100
        },
        casingParticles: {
            position: e.create(4.5, .6)
        },
        image: {
            position: e.create(80, 0)
        },
        ballistics: {
            damage: 6.75,
            obstacleMultiplier: 1,
            speed: .25,
            range: 85
        }
    }, {
        idString: "mp40",
        name: "MP40",
        itemType: p.Gun,
        ammoType: "9mm",
        ammoSpawnAmount: 96,
        capacity: 32,
        reloadTime: 2.1,
        fireDelay: 90,
        switchDelay: 300,
        speedMultiplier: .92,
        recoilMultiplier: .75,
        recoilDuration: 150,
        fireMode: $.Auto,
        shotSpread: 2,
        moveSpread: 4,
        length: 6.55,
        fists: {
            left: e.create(103, -2),
            right: e.create(40, 0),
            rightZIndex: 4,
            animationDuration: 100
        },
        image: {
            position: e.create(76, -3)
        },
        casingParticles: {
            position: e.create(4, .6)
        },
        ballistics: {
            damage: 11,
            obstacleMultiplier: 1,
            speed: .25,
            range: 130
        }
    }, {
        idString: "mcx_spear",
        name: "MCX Spear",
        itemType: p.Gun,
        ammoType: "762mm",
        ammoSpawnAmount: 80,
        capacity: 20,
        reloadTime: 2.75,
        fireDelay: 87.5,
        switchDelay: 400,
        speedMultiplier: .92,
        recoilMultiplier: .75,
        recoilDuration: 130,
        fireMode: $.Auto,
        shotSpread: 2,
        moveSpread: 4,
        length: 7.7,
        fists: {
            left: e.create(105, -6),
            right: e.create(40, 0),
            rightZIndex: 4,
            animationDuration: 100
        },
        image: {
            position: e.create(80, 0)
        },
        casingParticles: {
            position: e.create(5, .5)
        },
        ballistics: {
            damage: 16,
            obstacleMultiplier: 1.5,
            speed: .3,
            range: 180,
            tracer: {
                length: 1.4
            }
        }
    }, {
        idString: "lewis_gun",
        name: "Lewis Gun",
        itemType: p.Gun,
        ammoType: "762mm",
        ammoSpawnAmount: 94,
        capacity: 47,
        reloadTime: 3.4,
        fireDelay: 120,
        switchDelay: 400,
        speedMultiplier: .8,
        recoilMultiplier: .65,
        recoilDuration: 200,
        fireMode: $.Auto,
        shotSpread: 2,
        moveSpread: 9,
        length: 11.8,
        fists: {
            left: e.create(140, -10),
            right: e.create(40, 0),
            rightZIndex: 4,
            animationDuration: 100
        },
        image: {
            position: e.create(120, 0)
        },
        casingParticles: {
            position: e.create(4.7, 1.6)
        },
        ballistics: {
            damage: 16,
            obstacleMultiplier: 2.5,
            speed: .3,
            range: 180,
            tracer: {
                width: 1.1,
                length: 1.4
            }
        }
    }, {
        idString: "stoner_63",
        name: "Stoner 63",
        itemType: p.Gun,
        ammoType: "556mm",
        ammoSpawnAmount: 150,
        capacity: 75,
        reloadTime: 3.8,
        fireDelay: 90,
        switchDelay: 400,
        speedMultiplier: .9,
        recoilMultiplier: .7,
        recoilDuration: 175,
        fireMode: $.Auto,
        shotSpread: 3,
        moveSpread: 4.5,
        length: 7.7,
        fists: {
            left: e.create(105, -3),
            right: e.create(40, 0),
            rightZIndex: 4,
            animationDuration: 100
        },
        image: {
            position: e.create(90, 0)
        },
        casingParticles: {
            position: e.create(4, .6)
        },
        ballistics: {
            damage: 14.25,
            obstacleMultiplier: 2,
            speed: .28,
            range: 180,
            tracer: {
                width: 1.1,
                length: 1.4
            }
        }
    }, {
        idString: "m1_garand",
        name: "M1 Garand",
        itemType: p.Gun,
        ammoType: "762mm",
        ammoSpawnAmount: 40,
        capacity: 8,
        reloadTime: 2.1,
        fireDelay: 200,
        switchDelay: 400,
        speedMultiplier: .92,
        recoilMultiplier: .75,
        recoilDuration: 200,
        fireMode: $.Single,
        shotSpread: 1,
        moveSpread: 3.5,
        length: 8.1,
        fists: {
            left: e.create(110, -3),
            right: e.create(40, 0),
            rightZIndex: 4,
            animationDuration: 100
        },
        image: {
            position: e.create(87, 1)
        },
        casingParticles: {
            position: e.create(4, .6),
            velocity: {
                y: {
                    min: 4,
                    max: 15
                }
            }
        },
        ballistics: {
            damage: 39,
            obstacleMultiplier: 1.5,
            speed: .3,
            range: 230,
            tracer: {
                length: 2
            },
            lastShotFX: !0
        }
    }, {
        idString: "vss",
        name: "VSS",
        itemType: p.Gun,
        ammoType: "9mm",
        ammoSpawnAmount: 60,
        capacity: 20,
        reloadTime: 2.15,
        fireDelay: 140,
        switchDelay: 400,
        speedMultiplier: .92,
        recoilMultiplier: .7,
        recoilDuration: 140,
        fireMode: $.Single,
        shotSpread: 2,
        moveSpread: 3.5,
        length: 6.9,
        fists: {
            left: e.create(110, -2),
            right: e.create(40, 0),
            rightZIndex: 4,
            animationDuration: 100
        },
        image: {
            position: e.create(80, 0)
        },
        casingParticles: {
            position: e.create(4, .5)
        },
        noMuzzleFlash: !0,
        ballistics: {
            damage: 22,
            obstacleMultiplier: 1.5,
            speed: .22,
            range: 160,
            tracer: {
                opacity: .5,
                length: 1.5
            }
        }
    }, {
        idString: "sr25",
        name: "SR-25",
        itemType: p.Gun,
        ammoType: "762mm",
        ammoSpawnAmount: 80,
        capacity: 20,
        reloadTime: 2.5,
        fireDelay: 190,
        switchDelay: 400,
        speedMultiplier: .92,
        recoilMultiplier: .7,
        recoilDuration: 190,
        fireMode: $.Single,
        shotSpread: 1,
        moveSpread: 3.5,
        length: 7.2,
        fists: {
            left: e.create(110, 0),
            right: e.create(40, 0),
            rightZIndex: 4,
            animationDuration: 100
        },
        image: {
            position: e.create(80, 0)
        },
        casingParticles: {
            position: e.create(4.2, .5)
        },
        ballistics: {
            damage: 28.5,
            obstacleMultiplier: 1.5,
            speed: .3,
            range: 230,
            tracer: {
                length: 1.5
            }
        }
    }, {
        idString: "mini14",
        name: "Mini-14",
        itemType: p.Gun,
        ammoType: "556mm",
        ammoSpawnAmount: 80,
        capacity: 20,
        reloadTime: 2.4,
        fireDelay: 155,
        switchDelay: 400,
        speedMultiplier: .92,
        recoilMultiplier: .8,
        recoilDuration: 155,
        fireMode: $.Single,
        shotSpread: 2,
        moveSpread: 5,
        length: 7.4,
        fists: {
            left: e.create(96, -2),
            right: e.create(40, 0),
            rightZIndex: 4,
            animationDuration: 100
        },
        image: {
            position: e.create(85, 0)
        },
        casingParticles: {
            position: e.create(5, .5),
            velocity: {
                y: {
                    min: 4,
                    max: 15
                }
            }
        },
        ballistics: {
            damage: 25.5,
            obstacleMultiplier: 1.5,
            speed: .3,
            range: 230,
            tracer: {
                length: 1.5
            }
        }
    }, {
        idString: "usas12",
        name: "USAS-12",
        itemType: p.Gun,
        ammoType: "12g",
        ammoSpawnAmount: 30,
        capacity: 10,
        reloadTime: 3,
        fireDelay: 525,
        switchDelay: 400,
        speedMultiplier: .92,
        recoilMultiplier: .7,
        recoilDuration: 525,
        fireMode: $.Auto,
        shotSpread: 5,
        moveSpread: 14,
        length: 7.7,
        fists: {
            left: e.create(115, -1),
            right: e.create(40, 0),
            rightZIndex: 4,
            animationDuration: 100
        },
        image: {
            position: e.create(90, -3.5)
        },
        casingParticles: {
            position: e.create(4, .6)
        },
        ballistics: {
            damage: 8,
            obstacleMultiplier: 1,
            speed: .16,
            range: 55,
            onHitExplosion: "usas_explosion",
            goToMouse: !0,
            tracer: {
                length: .5,
                color: 16711680
            }
        }
    }, {
        idString: "s_g17",
        name: "G17 (scoped)",
        itemType: p.Gun,
        ammoType: "bb",
        fireDelay: 35,
        switchDelay: 250,
        speedMultiplier: 1.5,
        recoilMultiplier: .99,
        recoilDuration: 10,
        fireMode: $.Auto,
        shotSpread: .5,
        moveSpread: 5,
        length: 6.2,
        fists: {
            left: e.create(40, 0),
            right: e.create(40, 0),
            leftZIndex: 3,
            rightZIndex: 3,
            animationDuration: 80
        },
        noMuzzleFlash: !0,
        image: {
            position: e.create(65, 0)
        },
        capacity: 100,
        reloadTime: 1.5,
        ballistics: {
            damage: 2,
            obstacleMultiplier: .5,
            speed: .1,
            range: 70,
            tracer: {
                width: .7,
                opacity: .85,
                color: 16744448
            }
        }
    }, {
        idString: "deathray",
        name: "Death Ray",
        itemType: p.Gun,
        ammoType: "power_cell",
        capacity: 1,
        reloadTime: 1.4,
        fireDelay: 40,
        switchDelay: 500,
        speedMultiplier: .92,
        recoilMultiplier: .8,
        recoilDuration: 100,
        fireMode: $.Auto,
        shotSpread: .15,
        moveSpread: .1,
        killstreak: !0,
        length: 8.7,
        fists: {
            left: e.create(135, -6),
            right: e.create(75, 0),
            animationDuration: 100
        },
        image: {
            position: e.create(90, 0)
        },
        noMuzzleFlash: !0,
        casingParticles: {
            position: e.create(4.5, .6),
            spawnOnReload: !0
        },
        ballistics: {
            damage: 800,
            obstacleMultiplier: 2,
            speed: 4,
            range: 400,
            penetration: {
                players: !0,
                obstacles: !0
            },
            tracer: {
                image: "power_cell_trail",
                length: 10
            }
        }
    }, {
        idString: "revitalizer",
        name: "Revitalizer",
        itemType: p.Gun,
        ammoType: "12g",
        ammoSpawnAmount: 15,
        capacity: 5,
        reloadTime: .75,
        fireDelay: 925,
        switchDelay: 925,
        speedMultiplier: .92,
        recoilMultiplier: .5,
        recoilDuration: 550,
        fireMode: $.Single,
        shotSpread: 11,
        moveSpread: 14,
        killstreak: !0,
        consistentPatterning: !0,
        bulletCount: 10,
        length: 7.5,
        fists: {
            left: e.create(120, -2),
            right: e.create(45, 0),
            animationDuration: 100,
            rightZIndex: 4
        },
        image: {
            position: e.create(80, 0)
        },
        casingParticles: {
            position: e.create(4, .6),
            ejectionDelay: 450,
            velocity: {
                y: {
                    min: 2,
                    max: 5,
                    randomSign: !0
                }
            }
        },
        singleReload: !0,
        ballistics: {
            damage: 10,
            obstacleMultiplier: 1,
            speed: .16,
            range: 48,
            tracer: {
                length: .7
            }
        },
        wearerAttributes: {
            passive: {
                maxHealth: .51,
                maxAdrenaline: .8
            },
            on: {
                kill: [{
                    limit: 5,
                    maxHealth: 1.488,
                    maxAdrenaline: 1.201,
                    minAdrenaline: 20,
                    speedBoost: 1.02
                }, {
                    healthRestored: 230,
                    adrenalineRestored: 30
                }],
                damageDealt: [{
                    healthRestored: 2,
                    adrenalineRestored: 1.5
                }]
            }
        }
    }],
    Dt = Ui.map(a => {
        if (a.dual === void 0) return [a];
        const t = yt({}, a, a.dual, {
            idString: `dual_${a.idString}`,
            name: `Dual ${a.name}`,
            isDual: !0,
            singleVariant: a.idString
        });
        return delete t.dual, delete t.fists, delete t.image, delete t.casingParticles, delete a.dual, a.dualVariant = t.idString, [a, t]
    }).flat(),
    Ni = [{
        idString: "fists",
        name: "Fists",
        itemType: p.Melee,
        damage: 20,
        obstacleMultiplier: 1,
        radius: 1.5,
        offset: e.create(2.5, 0),
        cooldown: 250,
        noDrop: !0,
        speedMultiplier: 1,
        maxTargets: 1,
        fists: {
            animationDuration: 125,
            randomFist: !0,
            left: e.create(38, -35),
            right: e.create(38, 35),
            useLeft: e.create(75, -10),
            useRight: e.create(75, 10)
        }
    }, {
        idString: "baseball_bat",
        name: "Baseball Bat",
        itemType: p.Melee,
        damage: 34,
        obstacleMultiplier: 1.5,
        radius: 3.8,
        offset: e.create(3.8, 2.2),
        cooldown: 340,
        speedMultiplier: 1,
        maxTargets: 1,
        fists: {
            animationDuration: 150,
            left: e.create(55, -15),
            right: e.create(45, 0),
            useLeft: e.create(28, -15),
            useRight: e.create(50, -15)
        },
        image: {
            position: e.create(35, 45),
            usePosition: e.create(115, -14),
            angle: 155,
            useAngle: 45,
            lootScale: .55
        }
    }, {
        idString: "kbar",
        name: "K-bar",
        itemType: p.Melee,
        damage: 25,
        obstacleMultiplier: 1.25,
        radius: 2.7,
        offset: e.create(3.1, .9),
        cooldown: 225,
        speedMultiplier: 1,
        maxTargets: 1,
        fists: {
            animationDuration: 100,
            left: e.create(38, -35),
            right: e.create(38, 35),
            useLeft: e.create(38, -35),
            useRight: e.create(70, 20)
        },
        image: {
            position: e.create(62, 42),
            usePosition: e.create(90, 8),
            angle: 60,
            useAngle: 5,
            lootScale: .8
        }
    }, {
        idString: "maul",
        name: "Maul",
        itemType: p.Melee,
        damage: 54,
        obstacleMultiplier: 2,
        piercingMultiplier: 1,
        radius: 2.7,
        offset: e.create(5.4, -.5),
        cooldown: 450,
        speedMultiplier: 1,
        maxTargets: 1,
        fists: {
            animationDuration: 150,
            left: e.create(40, -25),
            right: e.create(40, 15),
            useLeft: e.create(35, -35),
            useRight: e.create(75, -20)
        },
        image: {
            position: e.create(45, 20),
            usePosition: e.create(85, -25),
            angle: 135,
            useAngle: 65,
            lootScale: .6
        }
    }, {
        idString: "gas_can",
        name: "Gas Can",
        itemType: p.Melee,
        damage: 22,
        obstacleMultiplier: 1,
        radius: 1.75,
        offset: e.create(3.1, .5),
        cooldown: 250,
        speedMultiplier: 1,
        maxTargets: 1,
        image: {
            position: e.create(54, 35),
            usePosition: e.create(91, 10),
            useAngle: 0,
            lootScale: .8,
            separateWorldImage: !0
        },
        fists: {
            animationDuration: 125,
            left: e.create(38, -35),
            right: e.create(38, 35),
            useLeft: e.create(38, -35),
            useRight: e.create(75, 10)
        }
    }, {
        idString: "heap_sword",
        name: "HE-AP sword",
        itemType: p.Melee,
        damage: 75,
        obstacleMultiplier: 2.5,
        piercingMultiplier: 1,
        killstreak: !0,
        radius: 4,
        offset: e.create(5, 0),
        cooldown: 300,
        speedMultiplier: 1,
        maxTargets: 1 / 0,
        fists: {
            animationDuration: 150,
            left: e.create(38, -35),
            right: e.create(38, 35),
            useLeft: e.create(38, -35),
            useRight: e.create(120, 20)
        },
        image: {
            position: e.create(102, 35),
            usePosition: e.create(140, -30),
            angle: 50,
            useAngle: -20,
            lootScale: .6
        }
    }, {
        idString: "ice_pick",
        name: "Ice Pick",
        itemType: p.Melee,
        damage: 35,
        obstacleMultiplier: 1.9,
        piercingMultiplier: 1,
        radius: 2.8,
        offset: e.create(5.4, -.5),
        cooldown: 420,
        speedMultiplier: 1,
        maxTargets: 1,
        fists: {
            animationDuration: 150,
            left: e.create(40, -30),
            right: e.create(40, 10),
            useLeft: e.create(33, -36),
            useRight: e.create(68, -20)
        },
        image: {
            position: e.create(47, 25),
            usePosition: e.create(85, -25),
            angle: 130,
            useAngle: 65,
            lootScale: .6
        }
    }, {
        idString: "seax",
        name: "Seax",
        itemType: p.Melee,
        damage: 45,
        obstacleMultiplier: 1.5,
        radius: 2.7,
        offset: e.create(5.4, -.5),
        cooldown: 410,
        speedMultiplier: 1,
        maxTargets: 1,
        fists: {
            animationDuration: 150,
            left: e.create(38, -35),
            right: e.create(38, 35),
            useLeft: e.create(38, -35),
            useRight: e.create(95, 20)
        },
        image: {
            position: e.create(80, 25),
            usePosition: e.create(123, -13),
            angle: 35,
            useAngle: 0,
            lootScale: .7
        }
    }],
    ot = new ae([{
        idString: "hasanger",
        name: "Hasanger",
        itemType: p.Skin,
        roleRequired: "hasanger"
    }, {
        idString: "leia",
        name: "Leia",
        itemType: p.Skin,
        roleRequired: "leia"
    }, {
        idString: "limenade",
        name: "LimeNade",
        itemType: p.Skin,
        roleRequired: "limenade"
    }, {
        idString: "katie",
        name: "Katie",
        itemType: p.Skin,
        roleRequired: "katie"
    }, {
        idString: "eipi",
        name: "eiπ",
        itemType: p.Skin,
        roleRequired: "eipi"
    }, {
        idString: "123op",
        name: "123OP",
        itemType: p.Skin,
        roleRequired: "123op"
    }, {
        idString: "radians",
        name: "Radians",
        itemType: p.Skin,
        roleRequired: "radians"
    }, {
        idString: "dev",
        name: "Developer Swag",
        itemType: p.Skin,
        roleRequired: "dev"
    }, {
        idString: "artist",
        name: "Artist Swag",
        itemType: p.Skin,
        roleRequired: "artist"
    }, {
        idString: "hazel_jumpsuit",
        name: "HAZEL Jumpsuit",
        itemType: p.Skin
    }, {
        idString: "forest_camo",
        name: "Forest Camo",
        itemType: p.Skin
    }, {
        idString: "desert_camo",
        name: "Desert Camo",
        itemType: p.Skin
    }, {
        idString: "arctic_camo",
        name: "Arctic Camo",
        itemType: p.Skin
    }, {
        idString: "bloodlust",
        name: "Bloodlust",
        itemType: p.Skin
    }, {
        idString: "tomato_skin",
        name: "Tomato",
        itemType: p.Skin
    }, {
        idString: "greenhorn",
        name: "Greenhorn",
        itemType: p.Skin
    }, {
        idString: "blue_blood",
        name: "Blue Blood",
        itemType: p.Skin
    }, {
        idString: "silver_lining",
        name: "Silver Lining",
        itemType: p.Skin
    }, {
        idString: "pot_o_gold",
        name: "Pot o' Gold",
        itemType: p.Skin
    }, {
        idString: "gunmetal",
        name: "Gunmetal",
        itemType: p.Skin
    }, {
        idString: "algae",
        name: "Algae",
        itemType: p.Skin
    }, {
        idString: "twilight_zone",
        name: "Twilight Zone",
        itemType: p.Skin
    }, {
        idString: "bubblegum",
        name: "Bubblegum",
        itemType: p.Skin
    }, {
        idString: "sunrise",
        name: "Sunrise",
        itemType: p.Skin
    }, {
        idString: "sunset",
        name: "Sunset",
        itemType: p.Skin
    }, {
        idString: "stratosphere",
        name: "Stratosphere",
        itemType: p.Skin
    }, {
        idString: "mango",
        name: "Mango",
        itemType: p.Skin
    }, {
        idString: "snow_cone",
        name: "Snow Cone",
        itemType: p.Skin
    }, {
        idString: "aquatic",
        name: "Aquatic",
        itemType: p.Skin
    }, {
        idString: "floral",
        name: "Floral",
        itemType: p.Skin
    }, {
        idString: "sunny",
        name: "Sunny",
        itemType: p.Skin
    }, {
        idString: "volcanic",
        name: "Volcanic",
        itemType: p.Skin
    }, {
        idString: "ashfall",
        name: "Ashfall",
        itemType: p.Skin
    }, {
        idString: "solar_flare",
        name: "Solar Flare",
        itemType: p.Skin
    }, {
        idString: "beacon",
        name: "Beacon",
        itemType: p.Skin
    }, {
        idString: "wave_jumpsuit",
        name: "Wave Jumpsuit",
        itemType: p.Skin
    }, {
        idString: "toadstool",
        name: "Toadstool",
        itemType: p.Skin
    }, {
        idString: "full_moon",
        name: "Full Moon",
        itemType: p.Skin
    }, {
        idString: "basic_outfit",
        name: "Basic Outfit",
        itemType: p.Skin,
        notInLoadout: !0
    }, {
        idString: "swiss_cheese",
        name: "Swiss Cheese",
        itemType: p.Skin
    }, {
        idString: "target_practice",
        name: "Target Practice",
        itemType: p.Skin
    }, {
        idString: "zebra",
        name: "Zebra",
        itemType: p.Skin
    }, {
        idString: "tiger",
        name: "Tiger",
        itemType: p.Skin
    }, {
        idString: "bee",
        name: "Bee",
        itemType: p.Skin
    }, {
        idString: "armadillo",
        name: "Armadillo",
        itemType: p.Skin
    }, {
        idString: "printer",
        name: "Printer",
        itemType: p.Skin
    }, {
        idString: "peppermint",
        name: "Peppermint",
        itemType: p.Skin,
        notInLoadout: !0
    }, {
        idString: "spearmint",
        name: "Spearmint",
        itemType: p.Skin,
        notInLoadout: !0
    }, {
        idString: "coal",
        name: "Coal",
        itemType: p.Skin,
        notInLoadout: !0
    }, {
        idString: "henrys_little_helper",
        name: "Henry's Little Helper",
        itemType: p.Skin,
        notInLoadout: !0
    }, {
        idString: "candy_cane",
        name: "Candy Cane",
        itemType: p.Skin,
        notInLoadout: !0
    }, {
        idString: "christmas_tree_skin",
        name: "Christmas Tree",
        itemType: p.Skin,
        notInLoadout: !0
    }, {
        idString: "gingerbread",
        name: "Gingerbread",
        itemType: p.Skin,
        notInLoadout: !0
    }, {
        idString: "verified",
        name: "Verified",
        itemType: p.Skin,
        notInLoadout: !0
    }, {
        idString: "nokilpls",
        name: "no kil pls",
        itemType: p.Skin,
        notInLoadout: !0
    }, {
        idString: "stardust",
        name: "Stardust",
        itemType: p.Skin,
        notInLoadout: !0
    }, {
        idString: "aurora",
        name: "Aurora",
        itemType: p.Skin,
        notInLoadout: !0
    }, {
        idString: "blueberry_smoothie",
        name: "Blueberry Smoothie",
        itemType: p.Skin,
        notInLoadout: !0
    }, {
        idString: "fireball",
        name: "Fireball",
        itemType: p.Skin
    }, {
        idString: "ghillie_suit",
        name: "Ghillie Suit",
        itemType: p.Skin,
        grassTint: !0,
        hideEquipment: !0,
        notInLoadout: !0
    }]),
    W = new ae([...Dt, ...lt, ...Ni, ...Oe, ...Ke, ...Ne, ...St, ...me, ...ot]);

function pe(a, t, i, o, r) {
    let n;
    switch (o) {
        case "open2":
            n = l.fromRect(16, 39.9);
            break;
        case "open1":
            n = l.fromRect(16, 34.9, e.create(0, 2));
            break;
        case "closed":
        default:
            n = l.fromRect(16, 30);
            break
    }
    return {
        idString: `container_${a}`,
        name: `Container ${a}`,
        spawnHitbox: n,
        scopeHitbox: l.fromRect(12, 27),
        ceilingImages: [{
            key: `container_ceiling_${o}${r?"_damaged":""}`,
            position: e.create(0, 0),
            tint: t
        }],
        floors: [{
            type: "metal",
            hitbox: l.fromRect(14, 28)
        }],
        obstacles: [{
            idString: `container_walls_${i}`,
            position: e.create(0, 0),
            rotation: 0
        }],
        lootSpawners: o === "closed" ? void 0 : [{
            position: e.create(0, 0),
            table: "ground_loot"
        }]
    }
}
const X = {
        White: 12632256,
        Red: 10692864,
        Green: 41742,
        Blue: 24483,
        Yellow: 13421568
    },
    ge = {
        container_1: 1,
        container_2: 2,
        container_3: 3,
        container_4: 4,
        container_5: 3,
        container_6: 4,
        container_7: 3,
        container_8: 4,
        container_10: 3
    },
    U = {
        ...ge,
        container_11: 7
    },
    Zt = {
        regular_crate: 2,
        barrel: 2,
        flint_crate: 1
    },
    rt = new ae([{
        idString: "porta_potty",
        name: "Porta Potty",
        spawnHitbox: l.fromRect(20, 32),
        scopeHitbox: l.fromRect(14, 18),
        floorImages: [{
            key: "porta_potty_floor",
            position: e.create(0, 1.5)
        }],
        ceilingImages: [{
            key: "porta_potty_ceiling",
            position: e.create(0, 0),
            residue: "porta_potty_residue"
        }],
        wallsToDestroy: 2,
        floors: [{
            type: "wood",
            hitbox: l.fromRect(14, 18)
        }],
        obstacles: [{
            idString: {
                porta_potty_toilet_open: .7,
                porta_potty_toilet_closed: .3
            },
            position: e.create(0, -5),
            rotation: 0
        }, {
            idString: "porta_potty_back_wall",
            position: e.create(0, -8.75),
            rotation: 0
        }, {
            idString: "porta_potty_sink_wall",
            position: e.create(-5.65, 0),
            rotation: 3
        }, {
            idString: "porta_potty_toilet_paper_wall",
            position: e.create(5.7, 0),
            rotation: 3
        }, {
            idString: "porta_potty_door",
            position: e.create(2.2, 8.8),
            rotation: 0
        }, {
            idString: "porta_potty_front_wall",
            position: e.create(-4.6, 8.66),
            rotation: 2
        }]
    }, {
        idString: "house",
        name: "House",
        spawnHitbox: new B(l.fromRect(41, 51, e.create(31.5, -14.5)), l.fromRect(68, 68, e.create(-18, -6)), l.fromRect(28, 17, e.create(-31, 31.5))),
        scopeHitbox: new B(l.fromRect(34.5, 42, e.create(29.25, -15.5)), l.fromRect(60.5, 56, e.create(-17.25, -8.5)), l.fromRect(15, 11, e.create(-31.5, 24.5))),
        floorImages: [{
            key: "house_floor",
            position: e.create(0, 0)
        }],
        ceilingImages: [{
            key: "house_ceiling",
            position: e.create(0, -1.5)
        }],
        floors: [{
            type: "stone",
            hitbox: l.fromRect(33, 41.5, e.create(29.5, -15.25))
        }, {
            type: "wood",
            hitbox: new B(l.fromRect(60, 56, e.create(-18, -9)), l.fromRect(18.8, 14, e.create(-31.4, 27)))
        }],
        obstacles: [{
            idString: "house_wall_4",
            position: e.create(-3.6, 8.5),
            rotation: 1
        }, {
            idString: "house_wall_1",
            position: e.create(-2.6, -2.8),
            rotation: 0
        }, {
            idString: "house_wall_4",
            position: e.create(-25.2, 8.5),
            rotation: 1
        }, {
            idString: "house_wall_1",
            position: e.create(-21.65, -2.8),
            rotation: 0
        }, {
            idString: "house_wall_3",
            position: e.create(6.35, -14.5),
            rotation: 0
        }, {
            idString: "house_wall_2",
            position: e.create(-18.25, -25.6),
            rotation: 1
        }, {
            idString: "house_wall_3",
            position: e.create(-41, -14.5),
            rotation: 0
        }, {
            idString: "house_wall_5",
            position: e.create(-17.28, -14.5),
            rotation: 0
        }, {
            idString: {
                toilet: .7,
                used_toilet: .3
            },
            position: e.create(7, 14.4),
            rotation: 2
        }, {
            idString: "stove",
            position: e.create(-9.3, 15.3),
            rotation: 2
        }, {
            idString: "fridge",
            position: e.create(-19.5, 15.3),
            rotation: 2
        }, {
            idString: "couch",
            position: e.create(-13.3, -26),
            rotation: 0
        }, {
            idString: "large_drawer",
            position: e.create(8.2, -26),
            rotation: 3
        }, {
            idString: "tv",
            position: e.create(11.5, -26),
            rotation: 0
        }, {
            idString: "house_exterior",
            position: e.create(0, -2.6),
            rotation: 0
        }, {
            idString: "chair",
            position: e.create(-41, 13),
            rotation: 0
        }, {
            idString: "chair",
            position: e.create(-41, 3),
            rotation: 2
        }, {
            idString: "table",
            position: e.create(-41, 8),
            rotation: 0
        }, {
            idString: "bed",
            position: e.create(-40.6, -27.5),
            rotation: 0
        }, {
            idString: "bookshelf",
            position: e.create(-21.6, -29.25),
            rotation: 1
        }, {
            idString: "small_drawer",
            position: e.create(-23, -19.3),
            rotation: 3
        }, {
            idString: "bookshelf",
            position: e.create(-.2, 12.5),
            rotation: 1
        }, {
            idString: "washing_machine",
            position: e.create(18.7, -31.9),
            rotation: 0
        }, {
            idString: "regular_crate",
            position: e.create(41.5, -30.9),
            rotation: 0
        }, {
            idString: "barrel",
            position: e.create(41.5, -20),
            rotation: 0
        }, {
            idString: "bookshelf",
            position: e.create(44.05, -1.55),
            rotation: 1
        }, {
            idString: "garage_door",
            position: e.create(30.18, 6.5),
            rotation: 0
        }, {
            idString: "door",
            position: e.create(-30.85, 20),
            rotation: 0
        }, {
            idString: "door",
            position: e.create(-29.85, -14.5),
            rotation: 0
        }, {
            idString: "door",
            position: e.create(-3.85, -14.5),
            rotation: 0
        }, {
            idString: "door",
            position: e.create(-12.6, -2.8),
            rotation: 2
        }, {
            idString: "door",
            position: e.create(13, -8.1),
            rotation: 3
        }, {
            idString: "door",
            position: e.create(6.5, -2.8),
            rotation: 2
        }, {
            idString: "window",
            position: e.create(-1.4, -36.75),
            rotation: 1
        }, {
            idString: "window",
            position: e.create(-28.65, -36.75),
            rotation: 1
        }, {
            idString: "window",
            position: e.create(-47.35, -8.35),
            rotation: 0
        }]
    }, {
        idString: "warehouse",
        name: "Warehouse",
        spawnHitbox: l.fromRect(60, 88),
        scopeHitbox: l.fromRect(40, 70),
        floorImages: [{
            key: "warehouse_floor",
            position: e.create(0, 0)
        }],
        ceilingImages: [{
            key: "warehouse_ceiling",
            position: e.create(0, 0)
        }],
        floors: [{
            type: "stone",
            hitbox: l.fromRect(40, 88)
        }],
        obstacles: [{
            idString: "warehouse_walls",
            position: e.create(-19.8, 0),
            rotation: 0
        }, {
            idString: "warehouse_walls",
            position: e.create(19.8, 0),
            rotation: 2
        }, {
            idString: Zt,
            position: e.create(14, -28.5)
        }, {
            idString: "regular_crate",
            position: e.create(-14, -28.5)
        }, {
            idString: "regular_crate",
            position: e.create(14, 28.5)
        }, {
            idString: Zt,
            position: e.create(-14, 28.5)
        }, {
            idString: "ammo_crate",
            position: e.create(-14, 0)
        }, {
            idString: "ammo_crate",
            position: e.create(14, 0)
        }, {
            idString: "box",
            get position() {
                return Ue(-16.6, -11.25, -14.93, -8.03)
            }
        }, {
            idString: "box",
            get position() {
                return Ue(-16.6, -11.25, 14.93, 8.03)
            }
        }, {
            idString: "box",
            get position() {
                return Ue(16.6, 11.25, -14.93, -8.03)
            }
        }, {
            idString: "box",
            get position() {
                return Ue(16.6, 11.25, 14.93, 8.03)
            }
        }, {
            idString: "box",
            get position() {
                return e.create(16.15 * tt(), 20.97 * tt())
            }
        }],
        lootSpawners: [{
            position: e.create(0, 0),
            table: "warehouse"
        }]
    }, {
        idString: "port_warehouse_red",
        name: "Red Port Warehouse",
        spawnHitbox: l.fromRect(72, 130),
        scopeHitbox: l.fromRect(58, 118),
        floorImages: [{
            key: "port_warehouse_floor",
            position: e.create(2, -30.2)
        }, {
            key: "port_warehouse_floor",
            position: e.create(-2, 30.2),
            rotation: Math.PI
        }],
        ceilingImages: [{
            key: "port_warehouse_ceiling_red",
            position: e.create(0, 0)
        }],
        obstacles: [{
            idString: "port_warehouse_walls",
            position: e.create(2, -30.2),
            rotation: 0
        }, {
            idString: "port_warehouse_walls",
            position: e.create(-2, 30.2),
            rotation: 2
        }, {
            idString: "super_barrel",
            position: e.create(-10, -52)
        }, {
            idString: "regular_crate",
            position: e.create(-22, -52)
        }, {
            idString: "forklift",
            position: e.create(15, -52),
            rotation: 3
        }, {
            idString: "regular_crate",
            position: e.create(-22, -10)
        }, {
            idString: "regular_crate",
            position: e.create(-20, 0)
        }, {
            idString: "regular_crate",
            position: e.create(-22, 10)
        }, {
            idString: "forklift",
            position: e.create(-8, -2),
            rotation: 2
        }, {
            idString: {
                regular_crate: .3,
                flint_crate: 1
            },
            position: e.create(-11, 50)
        }, {
            idString: "regular_crate",
            position: e.create(-22, 52)
        }, {
            idString: "barrel",
            position: e.create(1, 52)
        }, {
            idString: "super_barrel",
            position: e.create(10, 48)
        }, {
            idString: "barrel",
            position: e.create(23, 52)
        }, {
            idString: "barrel",
            position: e.create(17, 5)
        }, {
            idString: "barrel",
            position: e.create(24, 0)
        }, {
            idString: "box",
            position: e.create(24, 9)
        }, {
            idString: "box",
            position: e.create(19, 12)
        }]
    }, {
        idString: "port_warehouse_blue",
        name: "Blue Port Warehouse",
        spawnHitbox: l.fromRect(72, 130),
        scopeHitbox: l.fromRect(58, 118),
        floorImages: [{
            key: "port_warehouse_floor",
            position: e.create(2, -30.2)
        }, {
            key: "port_warehouse_floor",
            position: e.create(-2, 30.2),
            rotation: Math.PI
        }],
        ceilingImages: [{
            key: "port_warehouse_ceiling_blue",
            position: e.create(0, 0)
        }],
        obstacles: [{
            idString: "port_warehouse_walls",
            position: e.create(2, -30.2),
            rotation: 0
        }, {
            idString: "port_warehouse_walls",
            position: e.create(-2, 30.2),
            rotation: 2
        }, {
            idString: "super_barrel",
            position: e.create(-10, -52)
        }, {
            idString: "regular_crate",
            position: e.create(-22, -52)
        }, {
            idString: "forklift",
            position: e.create(15, -52),
            rotation: 3
        }, {
            idString: "regular_crate",
            position: e.create(-22, -10)
        }, {
            idString: "regular_crate",
            position: e.create(-20, 0)
        }, {
            idString: "regular_crate",
            position: e.create(-22, 10)
        }, {
            idString: "forklift",
            position: e.create(-8, -2),
            rotation: 2
        }, {
            idString: {
                regular_crate: .3,
                flint_crate: 1
            },
            position: e.create(-11, 50)
        }, {
            idString: "regular_crate",
            position: e.create(-22, 52)
        }, {
            idString: "barrel",
            position: e.create(1, 52)
        }, {
            idString: "super_barrel",
            position: e.create(10, 48)
        }, {
            idString: "barrel",
            position: e.create(23, 52)
        }, {
            idString: "barrel",
            position: e.create(17, 5)
        }, {
            idString: "barrel",
            position: e.create(24, 0)
        }, {
            idString: "box",
            position: e.create(24, 9)
        }, {
            idString: "box",
            position: e.create(19, 12)
        }]
    }, {
        idString: "refinery",
        name: "Refinery",
        spawnHitbox: l.fromRect(184, 131, e.create(35, 21.5)),
        scopeHitbox: new B(l.fromRect(33.5, 72, e.create(-32.75, 0)), l.fromRect(65.5, 29.5, e.create(16.75, -21.25))),
        floorImages: [{
            key: "refinery_floor",
            position: e.create(0, 0)
        }],
        ceilingImages: [{
            key: "refinery_ceiling",
            position: e.create(0, 0)
        }],
        groundGraphics: [{
            color: 5855577,
            hitbox: l.fromRect(176, 123, e.create(35, 21.5))
        }, {
            color: 11710976,
            hitbox: new b(21, e.create(45.5, 59.1))
        }, {
            color: 5263440,
            hitbox: new b(19, e.create(45.5, 59.1))
        }, {
            color: 11710976,
            hitbox: new b(21, e.create(97, 59.1))
        }, {
            color: 5263440,
            hitbox: new b(19, e.create(97, 59.1))
        }, {
            color: 11710976,
            hitbox: l.fromRect(2, 81, e.create(-9, 42.5))
        }, {
            color: 11710976,
            hitbox: l.fromRect(2, 59, e.create(16, 53.5))
        }, {
            color: 11710976,
            hitbox: l.fromRect(133, 2, e.create(56.5, 3))
        }, {
            color: 11710976,
            hitbox: l.fromRect(108, 2, e.create(69, 25))
        }],
        floors: [{
            type: "wood",
            hitbox: l.fromRect(33.5, 27, e.create(-32.75, 22.5))
        }, {
            type: "stone",
            hitbox: l.fromRect(176, 123, e.create(35, 21.5))
        }],
        obstacles: [{
            idString: "refinery_walls",
            position: e.create(0, 0),
            rotation: 0
        }, {
            idString: "window",
            position: e.create(-16, 18.5),
            rotation: 0
        }, {
            idString: "door",
            position: e.create(-31.15, 9.2),
            rotation: 0
        }, {
            idString: "table",
            position: e.create(-22, 28),
            rotation: 0
        }, {
            idString: "chair",
            position: e.create(-26, 28),
            rotation: 3
        }, {
            idString: {
                gun_mount_mcx_spear: .99,
                gun_mount_stoner_63: .01
            },
            position: e.create(-46.8, 28),
            rotation: 1
        }, {
            idString: "small_refinery_barrel",
            position: e.create(41.3, -14.8)
        }, {
            idString: "distillation_column",
            position: e.create(42.7, -28),
            rotation: 0
        }, {
            idString: "distillation_column",
            position: e.create(-42.65, 1),
            rotation: 0
        }, {
            idString: "distillation_equipment",
            position: e.create(0, -18),
            rotation: 2
        }, {
            idString: "smokestack",
            position: e.create(-39, -25.59)
        }, {
            idString: {
                barrel: 1,
                super_barrel: 1
            },
            position: e.create(-26, -30)
        }, {
            idString: {
                barrel: 1,
                super_barrel: 1
            },
            position: e.create(-21.5, 4)
        }, {
            idString: "regular_crate",
            position: e.create(28.75, -30)
        }, {
            idString: "regular_crate",
            position: e.create(-43, -11)
        }, {
            idString: "oil_tank",
            position: e.create(-38, 73),
            rotation: 0
        }, {
            idString: "barrel",
            position: e.create(-20.5, 77.5),
            rotation: 0
        }, {
            idString: "barrel",
            position: e.create(-21.5, 67),
            rotation: 0
        }, {
            idString: "regular_crate",
            position: e.create(-46.5, 45.5)
        }, {
            idString: "regular_crate",
            position: e.create(-36, 48)
        }, {
            idString: "large_refinery_barrel",
            position: e.create(45.5, 59.1)
        }, {
            idString: "large_refinery_barrel",
            position: e.create(97, 59.2)
        }, {
            idString: "regular_crate",
            position: e.create(69, 62)
        }, {
            idString: "aegis_crate",
            position: e.create(64, 75)
        }, {
            idString: "aegis_crate",
            position: e.create(77, 73)
        }, {
            idString: "barrel",
            position: e.create(117.5, 77.5)
        }, {
            idString: "regular_crate",
            position: e.create(117, 40)
        }, {
            idString: "super_barrel",
            position: e.create(27.5, 39)
        }, {
            idString: "barrel",
            position: e.create(-10, 0)
        }, {
            idString: "oil_tank",
            position: e.create(113, -25),
            rotation: 1
        }, {
            idString: "barrel",
            position: e.create(117.5, -7)
        }, {
            idString: "regular_crate",
            position: e.create(95, -33)
        }, {
            idString: "aegis_crate",
            position: e.create(76.25, -33.5)
        }, {
            idString: "super_barrel",
            position: e.create(85.25, -33.5)
        }, {
            idString: {
                barrel: 1,
                super_barrel: 1
            },
            position: e.create(83, -25)
        }, {
            idString: "super_barrel",
            position: e.create(75, -23)
        }, {
            idString: "regular_crate",
            position: e.create(76.25, -12)
        }, {
            idString: "inner_concrete_wall_1",
            position: e.create(116.75, -1.5),
            rotation: 0
        }, {
            idString: "inner_concrete_wall_1",
            position: e.create(106.05, -1.5),
            rotation: 0
        }, {
            idString: "inner_concrete_wall_2",
            position: e.create(70.05, -20.75),
            rotation: 1
        }, {
            idString: "inner_concrete_wall_1",
            position: e.create(74.5, -1.5),
            rotation: 0
        }, {
            idString: "inner_concrete_wall_1",
            position: e.create(116.75, 34),
            rotation: 0
        }, {
            idString: "inner_concrete_wall_1",
            position: e.create(106.05, 34),
            rotation: 0
        }, {
            idString: "inner_concrete_wall_1",
            position: e.create(95.35, 34),
            rotation: 0
        }, {
            idString: "inner_concrete_wall_1",
            position: e.create(47.84, 34),
            rotation: 0
        }, {
            idString: "inner_concrete_wall_1",
            position: e.create(37.14, 34),
            rotation: 0
        }, {
            idString: "inner_concrete_wall_1",
            position: e.create(26.44, 34),
            rotation: 0
        }, {
            idString: "inner_concrete_wall_4",
            position: e.create(22, 58.5),
            rotation: 1
        }, {
            idString: "inner_concrete_wall_3",
            position: e.create(-32.45, 39),
            rotation: 0
        }, {
            idString: "inner_concrete_wall_1",
            position: e.create(-15, 76.65),
            rotation: 1
        }, {
            idString: "inner_concrete_wall_1",
            position: e.create(-15, 65.95),
            rotation: 1
        }, {
            idString: "concrete_wall_end",
            position: e.create(-15, 83),
            rotation: 0
        }, {
            idString: "concrete_wall_segment_long",
            position: e.create(-32, 83),
            rotation: 0
        }, {
            idString: "concrete_wall_segment",
            position: e.create(-44.3, 83),
            rotation: 0
        }, {
            idString: "concrete_wall_corner",
            position: e.create(-53, 83),
            rotation: 0
        }, {
            idString: "concrete_wall_segment",
            position: e.create(-53, 74.4),
            rotation: 1
        }, {
            idString: "concrete_wall_end_broken",
            position: e.create(-53, 65.5),
            rotation: 1
        }, {
            idString: "concrete_wall_end_broken",
            position: e.create(-53, 44),
            rotation: 3
        }, {
            idString: "concrete_wall_segment_long",
            position: e.create(-53, 28),
            rotation: 3
        }, {
            idString: "concrete_wall_segment_long",
            position: e.create(-53, 0),
            rotation: 3
        }, {
            idString: "concrete_wall_segment_long",
            position: e.create(-53, -23.3),
            rotation: 3
        }, {
            idString: "concrete_wall_corner",
            position: e.create(-53, -40),
            rotation: 3
        }, {
            idString: "concrete_wall_segment_long",
            position: e.create(-36.3, -40),
            rotation: 0
        }, {
            idString: "concrete_wall_segment_long",
            position: e.create(-10, -40),
            rotation: 0
        }, {
            idString: "concrete_wall_end_broken",
            position: e.create(7, -40),
            rotation: 0
        }, {
            idString: "concrete_wall_end_broken",
            position: e.create(20, -40),
            rotation: 2
        }, {
            idString: "concrete_wall_segment_long",
            position: e.create(36, -40),
            rotation: 0
        }, {
            idString: "concrete_wall_segment_long",
            position: e.create(65, -40),
            rotation: 0
        }, {
            idString: "concrete_wall_end_broken",
            position: e.create(82, -40),
            rotation: 0
        }, {
            idString: "concrete_wall_end_broken",
            position: e.create(106, -40),
            rotation: 2
        }, {
            idString: "concrete_wall_segment",
            position: e.create(114.2, -40),
            rotation: 2
        }, {
            idString: "concrete_wall_corner",
            position: e.create(123, -40),
            rotation: 2
        }, {
            idString: "concrete_wall_segment_long",
            position: e.create(123, -23.2),
            rotation: 1
        }, {
            idString: "concrete_wall_segment",
            position: e.create(123, -10),
            rotation: 1
        }, {
            idString: "concrete_wall_end",
            position: e.create(123, -1.5),
            rotation: 3
        }, {
            idString: "concrete_wall_end",
            position: e.create(123, 29.5),
            rotation: 1
        }, {
            idString: "concrete_wall_segment_long",
            position: e.create(123, 46),
            rotation: 1
        }, {
            idString: "concrete_wall_segment_long",
            position: e.create(123, 66.3),
            rotation: 1
        }, {
            idString: "concrete_wall_corner",
            position: e.create(123, 83),
            rotation: 1
        }, {
            idString: "concrete_wall_segment_long",
            position: e.create(106.3, 83),
            rotation: 0
        }, {
            idString: "concrete_wall_segment_long",
            position: e.create(76, 83),
            rotation: 0
        }, {
            idString: "concrete_wall_segment_long",
            position: e.create(47, 83),
            rotation: 0
        }, {
            idString: "concrete_wall_segment",
            position: e.create(30, 83),
            rotation: 0
        }, {
            idString: "concrete_wall_end",
            position: e.create(22, 83),
            rotation: 2
        }],
        subBuildings: [{
            idString: "porta_potty",
            position: e.create(59.75, -27.6)
        }]
    }, {
        idString: "small_house",
        name: "Small House",
        spawnHitbox: l.fromRect(80, 80),
        scopeHitbox: l.fromRect(60, 56),
        floorImages: [{
            key: "house_floor_small",
            position: e.create(0, 0)
        }],
        ceilingImages: [{
            key: "house_ceiling_small",
            position: e.create(0, 0)
        }],
        floors: [{
            type: "wood",
            hitbox: l.fromRect(62, 58.5, e.create(0, -.25))
        }, {
            type: "stone",
            hitbox: l.fromRect(-10.1, 4.7, e.create(16.55, -31.75))
        }, {
            type: "stone",
            hitbox: l.fromRect(10.1, -4.7, e.create(-14.45, 31.75))
        }],
        obstacles: [{
            idString: "house_wall_2",
            position: e.create(-19.5, -6.75),
            rotation: 2
        }, {
            idString: "house_wall_1",
            position: e.create(5.4, -6.75),
            rotation: 2
        }, {
            idString: "house_wall_2",
            position: e.create(8.85, -18),
            rotation: 1
        }, {
            idString: "door",
            position: e.create(-4.5, -6.75),
            rotation: 2
        }, {
            idString: "house_wall_4",
            position: e.create(-2.5, 17.2),
            rotation: 1
        }, {
            idString: "house_wall_4",
            position: e.create(9.55, 17.2),
            rotation: 1
        }, {
            idString: "door",
            position: e.create(3.1, 7.2),
            rotation: 2
        }, {
            idString: {
                toilet: 2,
                used_toilet: 1
            },
            position: e.create(3.6, 23.5),
            rotation: 2
        }, {
            idString: "door",
            position: e.create(-14.8, 29),
            rotation: 2
        }, {
            idString: "door",
            position: e.create(16.2, -29.5),
            rotation: 2
        }, {
            idString: "couch",
            position: e.create(-21.6, -1.8),
            rotation: 3
        }, {
            idString: "large_drawer",
            position: e.create(-26.2, 21.5),
            rotation: 1
        }, {
            idString: "bookshelf",
            position: e.create(-6, 17.5),
            rotation: 3
        }, {
            idString: "stove",
            position: e.create(15.5, 24),
            rotation: 2
        }, {
            idString: "fridge",
            position: e.create(25, 24),
            rotation: 2
        }, {
            idString: "chair",
            position: e.create(25, 5),
            rotation: 0
        }, {
            idString: "chair",
            position: e.create(25, -5),
            rotation: 2
        }, {
            idString: "table",
            position: e.create(25, 0),
            rotation: 2
        }, {
            idString: "small_drawer",
            position: e.create(26, -25),
            rotation: 3
        }, {
            idString: "bed",
            position: e.create(-21.5, -22.5),
            rotation: 1
        }, {
            idString: "small_drawer",
            position: e.create(-26, -11.5),
            rotation: 1
        }, {
            idString: "bookshelf",
            position: e.create(5.5, -22),
            rotation: 1
        }, {
            idString: "window",
            position: e.create(-7.2, -29.5),
            rotation: 1
        }, {
            idString: "window",
            position: e.create(-31, 7.5),
            rotation: 2
        }, {
            idString: "window",
            position: e.create(31, 15.4),
            rotation: 2
        }, {
            idString: "window",
            position: e.create(31, -15.9),
            rotation: 2
        }, {
            idString: "small_house_exterior",
            position: e.create(0, 0),
            rotation: 2
        }]
    }, {
        idString: "crane",
        name: "Crane",
        spawnHitbox: l.fromRect(210, 100, e.create(55, -60)),
        ceilingHitbox: l.fromRect(210, 100, e.create(55, -60)),
        ceilingImages: [{
            key: "crane_ceiling",
            position: e.create(55.5, -60)
        }],
        ceilingZIndex: R.BuildingsCeiling + 1,
        obstacles: [{
            idString: "crane_base_part",
            position: e.create(-31.55, -87.3),
            rotation: 0
        }, {
            idString: "crane_base_part",
            position: e.create(-31.55, -35.6),
            rotation: 0
        }, {
            idString: "crane_base_part",
            position: e.create(32, -87.3),
            rotation: 0
        }, {
            idString: "crane_base_part",
            position: e.create(32, -35.6),
            rotation: 0
        }]
    }, {
        idString: "port_shed",
        name: "Port Shed",
        spawnHitbox: l.fromRect(27, 37, e.create(-.8, 0)),
        scopeHitbox: l.fromRect(20, 27.5, e.create(-.8, -1.5)),
        floorImages: [{
            key: "port_shed_floor",
            position: e.create(0, 0)
        }],
        ceilingImages: [{
            key: "port_shed_ceiling",
            position: e.create(-.8, -1.7)
        }],
        obstacles: [{
            idString: "port_shed_exterior",
            position: e.create(-.8, 0),
            rotation: 0
        }, {
            idString: "door",
            position: e.create(3.95, 12.15),
            rotation: 0
        }, {
            idString: "window",
            position: e.create(9.45, -2.6),
            rotation: 0
        }, {
            idString: "bookshelf",
            position: e.create(-7.75, 4.9),
            rotation: 1
        }, {
            idString: "table",
            position: e.create(2.2, -10.35),
            rotation: 1
        }, {
            idString: "chair",
            position: e.create(2.2, -5.5),
            rotation: 0
        }]
    }, pe(1, X.White, 1, "closed"), pe(2, X.Red, 1, "closed"), pe(3, X.Green, 2, "open1"), pe(4, X.Green, 2, "open1", !0), pe(5, X.Blue, 3, "open1"), pe(6, X.Blue, 3, "open1", !0), pe(7, X.Blue, 4, "open2"), pe(8, X.Blue, 4, "open2", !0), pe(9, X.Yellow, 5, "open1"), pe(10, X.Yellow, 6, "open2"), {
        idString: "container_11",
        name: "Invisible Container",
        spawnHitbox: l.fromRect(16, 30)
    }, {
        idString: "ship",
        name: "Ship",
        spawnHitbox: l.fromRect(110, 300, e.create(0, 0)),
        scopeHitbox: new B(l.fromRect(44, 38, e.create(9.5, -70.5)), l.fromRect(10, 15, e.create(-17, -60)), l.fromRect(50, 24, e.create(8, 93.2))),
        puzzle: {
            triggerInteractOn: "vault_door",
            interactDelay: 2e3
        },
        sounds: {
            solved: "generator_running",
            position: e.create(23, 75),
            maxRange: 416,
            falloff: 2
        },
        floorImages: [{
            key: "ship_floor_1",
            position: e.create(0, -65)
        }, {
            key: "ship_floor_2",
            position: e.create(.02, 64.8)
        }],
        ceilingImages: [{
            key: "ship_cabin_roof",
            position: e.create(4, -68)
        }, {
            key: "ship_tango_room_roof",
            position: e.create(8.5, 101.75)
        }],
        floors: [{
            type: "stone",
            hitbox: l.fromRect(82, 220, e.create(8.5, -20))
        }, {
            type: "stone",
            hitbox: l.fromRect(54, 20, e.create(8.5, 95))
        }, {
            type: "metal",
            hitbox: l.fromRect(20, 14, e.create(-40.6, -33.7))
        }, {
            type: "metal",
            hitbox: l.fromRect(20, 14, e.create(-40.6, 43))
        }],
        obstacles: [{
            idString: "vault_door",
            position: e.create(7.45, 81.5),
            rotation: 0
        }, {
            idString: "tango_crate",
            position: e.create(9, 93.5),
            rotation: 0
        }, {
            idString: "super_barrel",
            position: e.create(-12, 89)
        }, {
            idString: "box",
            position: e.create(28.5, 87)
        }, {
            idString: "box",
            position: e.create(30, 93)
        }, {
            idString: "box",
            position: e.create(-12, 99)
        }, {
            idString: "ship",
            position: e.create(0, 0),
            rotation: 0
        }, {
            idString: "ship_thing_1",
            position: e.create(-14, -111),
            rotation: 0
        }, {
            idString: "generator",
            position: e.create(23, 75),
            rotation: 0,
            puzzlePiece: !0
        }, {
            idString: "barrel",
            position: e.create(24, 66)
        }, {
            idString: {
                barrel: 1,
                super_barrel: 1
            },
            position: e.create(21, 58)
        }, {
            idString: "regular_crate",
            position: e.create(-6, 73)
        }, {
            idString: "regular_crate",
            position: e.create(-4, 61)
        }, {
            idString: "panel_without_button_small",
            position: e.create(14.5, -57),
            rotation: 2
        }, {
            idString: "panel_without_button",
            position: e.create(5, -57),
            rotation: 2
        }, {
            idString: "regular_crate",
            position: e.create(-7, -84)
        }, {
            idString: "barrel",
            position: e.create(2, -85)
        }, {
            idString: "bookshelf",
            position: e.create(23.5, -86.5),
            rotation: 2
        }, {
            idString: "ship_cabin_window",
            position: e.create(-16, -50.5),
            rotation: 1
        }, {
            idString: "ship_cabin_window",
            position: e.create(-6, -50.5),
            rotation: 1
        }, {
            idString: "ship_cabin_window",
            position: e.create(7, -50.5),
            rotation: 1
        }, {
            idString: "ship_cabin_window",
            position: e.create(18, -50.5),
            rotation: 1
        }],
        subBuildings: [{
            idString: ge,
            position: e.create(19, -64),
            orientation: 2
        }, {
            idString: ge,
            position: e.create(-15, 20)
        }, {
            idString: ge,
            position: e.create(-16, -20),
            orientation: 2
        }, {
            idString: ge,
            position: e.create(-31, -20),
            orientation: 2
        }, {
            idString: ge,
            position: e.create(16, -22)
        }, {
            idString: ge,
            position: e.create(15, 22),
            orientation: 2
        }, {
            idString: ge,
            position: e.create(-1, 22),
            orientation: 2
        }, {
            idString: ge,
            position: e.create(16, -110)
        }, {
            idString: ge,
            position: e.create(31, -110)
        }],
        lootSpawners: [{
            position: e.create(10, -73),
            table: "gas_can"
        }]
    }, {
        idString: "oil_tanker_ship",
        name: "Oil Tanker",
        spawnHitbox: l.fromRect(110, 300, e.create(0, 0)),
        scopeHitbox: new B(l.fromRect(65, 29, e.create(4.5, -102.5)), l.fromRect(7.5, 28, e.create(41.7, -101.5))),
        puzzle: {
            triggerInteractOn: "vault_door",
            interactDelay: 1500
        },
        floorImages: [{
            key: "oil_tanker_ship_floor_1",
            position: e.create(0, -59.439)
        }, {
            key: "oil_tanker_ship_floor_2",
            position: e.create(0, 59.439)
        }],
        ceilingImages: [{
            key: "oil_tanker_ship_ceiling",
            position: e.create(7, -99.5)
        }, {
            key: "oil_tanker_ship_tank_ceiling",
            position: e.create(9.5, 20)
        }],
        floors: [{
            type: "stone",
            hitbox: l.fromRect(82, 210, e.create(8.5, -13))
        }, {
            type: "metal",
            hitbox: l.fromRect(20, 10, e.create(-42, 18.5))
        }, {
            type: "metal",
            hitbox: l.fromRect(20, 10, e.create(-42, 58.5))
        }],
        obstacles: [{
            idString: "oil_tanker_ship",
            position: e.create(0, 0),
            rotation: 0
        }, {
            idString: "large_oil_tank",
            position: e.create(9, -46.5),
            rotation: -Math.PI * 2
        }, {
            idString: "large_oil_tank",
            position: e.create(9, 20),
            rotation: Math.PI / 2
        }, {
            idString: "large_oil_tank",
            position: e.create(9, 88),
            rotation: -Math.PI / 2
        }, {
            idString: "ship_cabin_window",
            position: e.create(-.25, -87.5),
            rotation: 1
        }, {
            idString: "ship_cabin_window",
            position: e.create(9.75, -87.5),
            rotation: 1
        }, {
            idString: "ship_cabin_window",
            position: e.create(22, -87.5),
            rotation: 1
        }, {
            idString: "ship_cabin_window",
            position: e.create(31, -87.5),
            rotation: 1
        }, {
            idString: "panel_without_button_small",
            position: e.create(-1, -93.8),
            rotation: 2
        }, {
            idString: "large_drawer",
            position: e.create(9.5, -93.5),
            rotation: 2
        }, {
            idString: "panel_with_a_button",
            position: e.create(22, -93.8),
            rotation: 2,
            puzzlePiece: !0
        }, {
            idString: "panel_without_button_small",
            position: e.create(31.7, -93.8),
            rotation: 2
        }, {
            idString: "vault_door",
            position: e.create(-6.5, -110),
            rotation: 3
        }, {
            idString: "briefcase",
            position: e.create(-22.5, -94),
            rotation: 0
        }, {
            idString: "regular_crate",
            position: e.create(-12.19, -94.34)
        }, {
            idString: "regular_crate",
            position: e.create(-23.1, -102.93)
        }, {
            idString: "barrel",
            position: e.create(-27, 68)
        }, {
            idString: "regular_crate",
            position: e.create(-18, 66)
        }, {
            idString: "regular_crate",
            position: e.create(42, 66)
        }, {
            idString: {
                regular_crate: 2,
                aegis_crate: 1,
                flint_crate: 1
            },
            position: e.create(32, 60),
            rotation: 2
        }, {
            idString: "sandbags",
            position: e.create(-22, 1),
            rotation: 2
        }, {
            idString: "super_barrel",
            position: e.create(-27, -20)
        }, {
            idString: "barrel",
            position: e.create(-15, -15)
        }, {
            idString: "regular_crate",
            position: e.create(-25, -10)
        }, {
            idString: "sandbags",
            position: e.create(43, -20),
            rotation: 1
        }, {
            idString: "super_barrel",
            position: e.create(43, -7.5)
        }, {
            idString: "sandbags",
            position: e.create(30, -16),
            rotation: 2
        }, {
            idString: "flint_crate",
            position: e.create(41, -35)
        }]
    }, {
        idString: "port",
        name: "Port",
        spawnHitbox: l.fromRect(315, 290, e.create(-5, 0)),
        groundGraphics: [{
            color: "#6664",
            hitbox: l.fromRect(297.2, 271.7, e.create(-4.5, 0))
        }, {
            color: 5855577,
            hitbox: l.fromRect(293.5, 267.96, e.create(-4.5, 0))
        }, {
            color: 15132390,
            hitbox: new B(l.fromRect(1.47, 102.18, e.create(129.93, 73.42)), l.fromRect(126.01, 1.5, e.create(67.66, 123.77)), l.fromRect(84.61, 1.48, e.create(88.35, 74.7)), l.fromRect(74.74, 1.52, e.create(-113.86, -33.25)), l.fromRect(84.61, 1.49, e.create(88.35, 49.55)), l.fromRect(1.51, 56, e.create(-77.24, -5)), l.fromRect(207.5, 1.5, e.create(25.75, 23.08)), l.fromRect(84.61, 1.49, e.create(88.35, 98.77)), l.fromRect(1.47, 63.43, e.create(5.4, 92.81)), l.fromRect(82.47, 1.48, e.create(-35.1, 61.83)), l.fromRect(1.44, 8.6, e.create(-75.61, 65.39)), l.fromRect(1.46, 8.6, e.create(-102.2, 65.39)), l.fromRect(14, 1.48, e.create(-109.9, 61.83)), l.fromRect(1.46, 55.47, e.create(-116.51, 34.84)), l.fromRect(35.45, 1.47, e.create(-133.5, 7.85)))
        }, {
            color: 11710976,
            hitbox: l.fromRect(1.87, 186.8, e.create(143.17, -33.97))
        }, {
            color: 2829099,
            hitbox: new B(l.fromRect(.75, 128, e.create(64.33, -46)), l.fromRect(.75, 128, e.create(66.55, -46)), l.fromRect(.75, 128, e.create(127.9, -46)), l.fromRect(.75, 128, e.create(130.1, -46)))
        }],
        floors: [{
            type: "stone",
            hitbox: l.fromRect(300, 270, e.create(-5, 0))
        }],
        decals: [{
            idString: "floor_oil_01",
            position: e.create(69.49, 116.11)
        }, {
            idString: "floor_oil_02",
            position: e.create(-87.54, -117.88)
        }, {
            idString: "floor_oil_03",
            position: e.create(-147.56, -92.28)
        }, {
            idString: "floor_oil_04",
            position: e.create(86.72, -64.06)
        }, {
            idString: "floor_oil_05",
            position: e.create(-135.24, 82.47)
        }, {
            idString: "floor_oil_06",
            position: e.create(-79.85, -46.97)
        }, {
            idString: "floor_oil_07",
            position: e.create(-13.48, 10.95)
        }, {
            idString: "container_mark",
            position: e.create(-60, 5)
        }, {
            idString: "container_mark",
            position: e.create(-45, 5)
        }, {
            idString: "container_mark",
            position: e.create(-30, 5)
        }, {
            idString: "container_mark",
            position: e.create(-60, -25)
        }, {
            idString: "container_mark",
            position: e.create(-45, -25)
        }, {
            idString: "container_mark",
            position: e.create(-30, -25)
        }, {
            idString: "container_mark",
            position: e.create(5, 5)
        }, {
            idString: "container_mark",
            position: e.create(20, 5)
        }, {
            idString: "container_mark",
            position: e.create(35, 5)
        }, {
            idString: "container_mark",
            position: e.create(5, -25)
        }, {
            idString: "container_mark",
            position: e.create(20, -25)
        }, {
            idString: "container_mark",
            position: e.create(35, -25)
        }, {
            idString: "container_mark",
            position: e.create(-100, -60)
        }, {
            idString: "container_mark",
            position: e.create(-115, -60)
        }, {
            idString: "container_mark",
            position: e.create(-130, -60)
        }, {
            idString: "container_mark",
            position: e.create(-100, -90)
        }, {
            idString: "container_mark",
            position: e.create(-115, -90)
        }, {
            idString: "container_mark",
            position: e.create(-130, -90)
        }, {
            idString: "container_mark",
            position: e.create(82.5, 0)
        }, {
            idString: "container_mark",
            position: e.create(97.5, 0)
        }, {
            idString: "container_mark",
            position: e.create(112.5, 0)
        }, {
            idString: "container_mark",
            position: e.create(82.5, -30)
        }, {
            idString: "container_mark",
            position: e.create(97.5, -30)
        }, {
            idString: "container_mark",
            position: e.create(112.5, -30)
        }],
        obstacles: [{
            idString: "truck",
            position: e.create(72.5, 34),
            rotation: 3
        }, {
            idString: "trailer",
            position: e.create(100, 34),
            rotation: 3
        }, {
            idString: "regular_crate",
            position: e.create(67.36, 58.18)
        }, {
            idString: "forklift",
            position: e.create(95, 64),
            rotation: 1
        }, {
            idString: "pallet",
            position: e.create(107.5, 64),
            rotation: 1
        }, {
            idString: "barrel",
            position: e.create(107.5, 64)
        }, {
            idString: "trailer",
            position: e.create(100, 84),
            rotation: 1
        }, {
            idString: "regular_crate",
            position: e.create(100, 110)
        }, {
            idString: {
                regular_crate: 3,
                grenade_crate: 1
            },
            position: e.create(110, 115)
        }, {
            idString: "regular_crate",
            position: e.create(113, 103)
        }, {
            idString: "box",
            position: e.create(37, 113)
        }, {
            idString: "box",
            position: e.create(42, 110)
        }, {
            idString: "box",
            position: e.create(35, 107)
        }, {
            idString: "box",
            position: e.create(42, 104)
        }, {
            idString: "forklift",
            position: e.create(20, 102.5),
            rotation: 2
        }, {
            idString: "pallet",
            position: e.create(20, 90),
            rotation: 2
        }, {
            idString: "truck",
            position: e.create(-50, 50),
            rotation: 1
        }, {
            idString: "barrier",
            position: e.create(-124, -10),
            rotation: 0
        }, {
            idString: "sandbags",
            position: e.create(-135, -5),
            rotation: 1
        }, {
            idString: "sandbags",
            position: e.create(-135, -20),
            rotation: 2
        }, {
            idString: "sandbags",
            position: e.create(-144, 65),
            rotation: 1
        }, {
            idString: "sandbags",
            position: e.create(-132, 60),
            rotation: 2
        }, {
            idString: "super_barrel",
            position: e.create(-137, 75)
        }, {
            idString: "barrel",
            position: e.create(-147, 80)
        }, {
            idString: "super_barrel",
            position: e.create(-134, 90)
        }, {
            idString: "barrel",
            position: e.create(-126, 85)
        }, {
            idString: {
                aegis_crate: 1,
                flint_crate: 1
            },
            position: e.create(-126, 100)
        }, {
            idString: {
                aegis_crate: 1,
                flint_crate: 1
            },
            position: e.create(-136, 105)
        }, {
            idString: "sandbags",
            position: e.create(-132, 117),
            rotation: 2
        }, {
            idString: "barrel",
            position: e.create(-145, 117)
        }, {
            idString: "forklift",
            position: e.create(-110, -120),
            rotation: 3
        }, {
            idString: "pallet",
            position: e.create(-122.5, -120),
            rotation: 1
        }, {
            idString: "grenade_crate",
            position: e.create(-122.5, -120)
        }, {
            idString: {
                regular_crate: 3,
                grenade_crate: 1
            },
            position: e.create(-135, -125)
        }, {
            idString: {
                regular_crate: 2,
                flint_crate: 1,
                aegis_crate: 1
            },
            position: e.create(-140, -115),
            rotation: 1
        }, {
            idString: "flint_crate",
            position: e.create(-64.6, -58.48)
        }, {
            idString: {
                flint_crate: 1,
                regular_crate: 1
            },
            position: e.create(-53.6, -55.38)
        }, {
            idString: "barrel",
            position: e.create(-142, -95)
        }, {
            idString: "super_barrel",
            position: e.create(-147, -87)
        }, {
            idString: "regular_crate",
            position: e.create(54.57, -72.34)
        }, {
            idString: {
                regular_crate: 3,
                grenade_crate: 1
            },
            position: e.create(108, -110)
        }, {
            idString: "regular_crate",
            position: e.create(100, -100)
        }, {
            idString: {
                regular_crate: 3,
                grenade_crate: 1
            },
            position: e.create(104, -90)
        }, {
            idString: "forklift",
            position: e.create(110, -65),
            rotation: 2
        }, {
            idString: "pallet",
            position: e.create(110, -77.5),
            rotation: 2
        }, {
            idString: "box",
            position: e.create(112.28, -78.85)
        }, {
            idString: {
                barrel: 2,
                super_barrel: 1
            },
            position: e.create(93.77, -72.33)
        }, {
            idString: {
                barrel: 2,
                super_barrel: 1
            },
            position: e.create(75.38, -68.72)
        }, {
            idString: "aegis_crate",
            position: e.create(54.48, -118.9)
        }, {
            idString: {
                aegis_crate: 1,
                regular_crate: 1
            },
            position: e.create(64.96, -123.57)
        }, ...Array.from({
            length: 5
        }, (a, t) => ({
            idString: "bollard",
            position: e.create(140.4, 50 - 41.5 * t),
            rotation: 0
        })), ...Array.from({
            length: 20
        }, (a, t) => ({
            idString: "port_fence",
            position: e.create(-.75 - 7.8 * t, 135),
            rotation: 0
        })), ...Array.from({
            length: 14
        }, (a, t) => ({
            idString: "port_fence",
            position: e.create(130 - 7.8 * t, 135),
            rotation: 0
        })), ...Array.from({
            length: 16
        }, (a, t) => ({
            idString: "port_fence",
            position: e.create(-152.3, 131.8 - 7.8 * t),
            rotation: 1
        })), ...Array.from({
            length: 13
        }, (a, t) => ({
            idString: "port_fence",
            position: e.create(-152.3, -37.8 - 7.8 * t),
            rotation: 1
        })), ...Array.from({
            length: 24
        }, (a, t) => ({
            idString: "port_fence",
            position: e.create(46 - 7.8 * t, -135),
            rotation: 0
        })), ...Array.from({
            length: 9
        }, (a, t) => ({
            idString: "port_fence",
            position: e.create(132.2 - 7.8 * t, -135),
            rotation: 0
        })), {
            idString: "port_fence_side",
            position: e.create(139.95, -131.59),
            rotation: 1
        }, {
            idString: "crane_base_end",
            position: e.create(65.5, 18.59),
            rotation: 0
        }, {
            idString: "crane_base_end",
            position: e.create(129, -110.46),
            rotation: 0
        }, {
            idString: "crane_base_end",
            position: e.create(129, 18.59),
            rotation: 0
        }, {
            idString: "crane_base_end",
            position: e.create(65.5, -110.46),
            rotation: 0
        }],
        subBuildings: [{
            idString: "container_1",
            position: e.create(-84, 100),
            orientation: 1
        }, {
            idString: "crane",
            position: e.create(97, 25)
        }, {
            idString: "port_warehouse_red",
            position: e.create(-95, -59),
            orientation: 1
        }, {
            idString: "port_warehouse_blue",
            position: e.create(-97, 15),
            orientation: 3
        }, {
            idString: "port_shed",
            position: e.create(-25, -134),
            orientation: 1
        }, {
            idString: "porta_potty",
            position: e.create(-47, -140.8),
            orientation: 1
        }, {
            idString: "porta_potty",
            position: e.create(82.5, -100)
        }, {
            idString: U,
            position: e.create(-60, 5)
        }, {
            idString: U,
            position: e.create(-45, 5)
        }, {
            idString: U,
            position: e.create(-30, 5)
        }, {
            idString: U,
            position: e.create(60, 25),
            orientation: 2
        }, {
            idString: U,
            position: e.create(45, 25),
            orientation: 2
        }, {
            idString: U,
            position: e.create(30, 25),
            orientation: 2
        }, {
            idString: U,
            position: e.create(5, 5)
        }, {
            idString: U,
            position: e.create(20, 5)
        }, {
            idString: U,
            position: e.create(35, 5)
        }, {
            idString: U,
            position: e.create(-5, 25),
            orientation: 2
        }, {
            idString: U,
            position: e.create(-20, 25),
            orientation: 2
        }, {
            idString: U,
            position: e.create(-35, 25),
            orientation: 2
        }, {
            idString: U,
            position: e.create(-100, -60)
        }, {
            idString: U,
            position: e.create(-115, -60)
        }, {
            idString: U,
            position: e.create(-130, -60)
        }, {
            idString: U,
            position: e.create(100, 90),
            orientation: 2
        }, {
            idString: U,
            position: e.create(115, 90),
            orientation: 2
        }, {
            idString: U,
            position: e.create(130, 90),
            orientation: 2
        }, {
            idString: U,
            position: e.create(82.5, 0)
        }, {
            idString: U,
            position: e.create(97.5, 0)
        }, {
            idString: U,
            position: e.create(112.5, 0)
        }, {
            idString: U,
            position: e.create(-82.5, 30),
            orientation: 2
        }, {
            idString: U,
            position: e.create(-97.5, 30),
            orientation: 2
        }, {
            idString: U,
            position: e.create(-112.5, 30),
            orientation: 2
        }]
    }, {
        idString: "port_complex",
        name: "Port Complex",
        spawnHitbox: l.fromRect(360, 285, e.create(-25, 0)),
        spawnMode: oe.Beach,
        subBuildings: [{
            idString: "port",
            position: e.create(-120, 0)
        }, {
            idString: {
                ship: 1,
                oil_tanker_ship: 1
            },
            position: e.create(74, -65)
        }]
    }, {
        idString: "armory_barracks",
        name: "Armory Barracks",
        spawnHitbox: l.fromRect(50, 84),
        scopeHitbox: l.fromRect(50, 84),
        floorImages: [{
            key: "armory_barracks_floor",
            position: e.create(0, 0)
        }],
        ceilingImages: [{
            key: "armory_barracks_ceiling",
            position: e.create(0, 0)
        }],
        floors: [{
            type: "wood",
            hitbox: l.fromRect(50, 84)
        }],
        obstacles: [{
            idString: "armory_barracks_walls",
            position: e.create(0, 0),
            rotation: 0
        }, {
            idString: "door",
            position: e.create(2.7, -41.3),
            rotation: 2
        }, {
            idString: "fridge",
            position: e.create(-19.8, -35.5),
            rotation: 1
        }, {
            idString: "stove",
            position: e.create(-19.8, -26.1),
            rotation: 1
        }, {
            idString: "bunk_bed",
            position: e.create(18, -31.25),
            rotation: 0
        }, {
            idString: "small_drawer",
            position: e.create(18.4, -18.7),
            rotation: 0
        }, {
            idString: "small_drawer",
            position: e.create(-2, -13.6),
            rotation: 1
        }, {
            idString: "bunk_bed",
            position: e.create(-14.43, -13.21),
            rotation: 1
        }, {
            idString: "bunk_bed",
            position: e.create(-18.1, 7.6),
            rotation: 2
        }, {
            idString: "bunk_bed",
            position: e.create(17.95, 7),
            rotation: 0
        }, {
            idString: "bunk_bed",
            position: e.create(-14.48, 34.83),
            rotation: 3
        }, {
            idString: "cabinet",
            position: e.create(16, 37.6),
            rotation: 2
        }, {
            idString: "cabinet",
            position: e.create(16, 20.9),
            rotation: 0
        }, {
            idString: "door",
            position: e.create(1.15, 41.3),
            rotation: 0
        }, {
            idString: "window",
            position: e.create(24.5, -9.5),
            rotation: 0
        }, {
            idString: "window",
            position: e.create(24.5, 28.75),
            rotation: 0
        }, {
            idString: "window",
            position: e.create(-24.5, 23),
            rotation: 0
        }]
    }, {
        idString: "armory_center",
        name: "Armory Center",
        spawnHitbox: l.fromRect(31, 44, e.create(1.5, 0)),
        scopeHitbox: l.fromRect(31, 44, e.create(1.5, 0)),
        floorImages: [{
            key: "armory_center_floor",
            position: e.create(0, 0)
        }],
        ceilingImages: [{
            key: "armory_center_ceiling",
            position: e.create(1.25, 0)
        }],
        floors: [{
            type: "wood",
            hitbox: l.fromRect(31, 44, e.create(1.5, 0))
        }],
        obstacles: [{
            idString: "armory_center_walls",
            position: e.create(0, 0),
            rotation: 0
        }, {
            idString: "door",
            position: e.create(-13.9, -12.43),
            rotation: 1
        }, {
            idString: "cabinet",
            position: e.create(12.45, -11.6),
            rotation: 3
        }, {
            idString: "table",
            position: e.create(8.85, 1.6),
            rotation: 1
        }, {
            idString: "chair",
            position: e.create(3, 1.7),
            rotation: 3
        }, {
            idString: "chair",
            position: e.create(10.1, 6),
            rotation: 0
        }, {
            idString: "small_drawer",
            position: e.create(-9.2, 16.8),
            rotation: 2
        }, {
            idString: "gun_mount_maul",
            position: e.create(3, 19.05),
            rotation: 2
        }, {
            idString: "window",
            position: e.create(-13.9, 7.1),
            rotation: 0
        }]
    }, {
        idString: "armory_vault",
        name: "Armory Vault",
        spawnHitbox: l.fromRect(72, 38, e.create(0, -2)),
        scopeHitbox: l.fromRect(72, 38, e.create(0, -2)),
        puzzle: {
            triggerInteractOn: "vault_door",
            interactDelay: 1500,
            order: ["o", "l", "j", "y"],
            solvedSound: !0,
            setSolvedImmediately: !0
        },
        floorImages: [{
            key: "armory_vault_floor",
            position: e.create(0, 0)
        }],
        ceilingImages: [{
            key: "armory_vault_ceiling",
            position: e.create(0, -2.5)
        }],
        ceilingZIndex: R.BuildingsCeiling + 1,
        floors: [{
            type: "wood",
            hitbox: l.fromRect(72, 38, e.create(0, -2))
        }],
        subBuildings: [{
            idString: "armory_inner_vault",
            position: e.create(-25, -2.25)
        }],
        obstacles: [{
            idString: "armory_vault_walls",
            position: e.create(0, 0),
            rotation: 0
        }, {
            idString: "door",
            position: e.create(3.8, 16.5),
            rotation: 0
        }, {
            idString: "window",
            position: e.create(18.1, 16.5),
            rotation: 1
        }, {
            idString: "gun_case",
            position: e.create(31.9, 10),
            rotation: 3
        }, {
            idString: "gun_case",
            position: e.create(-7.5, 12.4),
            rotation: 2
        }, {
            idString: "ammo_crate",
            position: e.create(29.5, -.45),
            rotation: 0
        }, {
            idString: "ammo_crate",
            position: e.create(12.85, -.45),
            rotation: 0
        }, {
            idString: "tear_gas_crate",
            position: e.create(21.2, -.45),
            rotation: 1
        }, {
            idString: "grenade_crate",
            position: e.create(-9.1, -15.9),
            rotation: 0
        }, ...Array.from({
            length: 4
        }, (a, t) => ({
            idString: "button",
            position: e.create(10 + 4.75 * t, -19.2),
            rotation: 0,
            puzzlePiece: ["y", "o", "j", "l"][t]
        })), {
            idString: "panel_without_button",
            position: e.create(30.7, -14),
            rotation: 1
        }, {
            idString: "ammo_crate",
            position: e.create(-20, -14.8),
            rotation: 0
        }, {
            idString: "regular_crate",
            position: e.create(-29.8, -14.8),
            rotation: 0
        }, {
            idString: "barrel",
            position: e.create(-30.9, 11.3)
        }, {
            idString: "briefcase",
            position: e.create(-20.7, 10.85),
            rotation: 0
        }, {
            idString: "vault_door",
            position: e.create(-14.1, -3.22),
            rotation: 3
        }]
    }, {
        idString: "armory_inner_vault",
        name: "Armory Inner Vault",
        spawnHitbox: l.fromRect(20.87, 36.34),
        scopeHitbox: l.fromRect(20.87, 36.34),
        ceilingImages: [{
            key: "armory_inner_vault_ceiling",
            position: e.create(0, 0)
        }]
    }, {
        idString: "armory",
        name: "Armory",
        spawnHitbox: l.fromRect(160, 176),
        spawnMode: oe.GrassAndSand,
        subBuildings: [{
            idString: "armory_barracks",
            position: e.create(-41.31, 27.86)
        }, {
            idString: "armory_center",
            position: e.create(55.4, 15.07)
        }, {
            idString: "armory_vault",
            position: e.create(-35.03, -58.37)
        }, {
            idString: "port_shed",
            position: e.create(-60.9, -65.63),
            orientation: 2
        }, {
            idString: "porta_potty",
            position: e.create(31.87, -60.35),
            orientation: 1
        }],
        groundGraphics: [{
            color: "#6664",
            hitbox: l.fromRect(153.09, 1.87, e.create(0, -83.96))
        }, {
            color: "#6664",
            hitbox: l.fromRect(153.09, 1.87, e.create(0, 83.96))
        }, {
            color: "#6664",
            hitbox: l.fromRect(1.93, 168, e.create(-75.57, 0))
        }, {
            color: "#6664",
            hitbox: l.fromRect(1.93, 168, e.create(75.57, 0))
        }, {
            color: 4210752,
            hitbox: new ke([e.create(5.54, -80.63), e.create(62.37, -80.63), e.create(62.37, -24.57), e.create(48.11, -15.97), e.create(34.01, -15.97), e.create(34.01, 84.86), e.create(-8.82, 84.86), e.create(-8.82, -32.87), e.create(5.54, -41.2)])
        }, ...Array.from({
            length: 4
        }, (a, t) => ({
            color: 5592405,
            hitbox: l.fromRect(13.15, 24.16, e.create(-1.5, -3.4 + 25.2 * t))
        })), ...Array.from({
            length: 6
        }, (a, t) => ({
            color: 5592405,
            hitbox: l.fromRect(13.15, 24.16, e.create(12.7, -53.8 + 25.2 * t))
        })), ...Array.from({
            length: 6
        }, (a, t) => ({
            color: 5592405,
            hitbox: l.fromRect(13.15, 24.16, e.create(26.95, -53.8 + 25.2 * t))
        })), ...Array.from({
            length: 2
        }, (a, t) => ({
            color: 5592405,
            hitbox: l.fromRect(13.15, 24.16, e.create(41.1, -53.8 + 25.2 * t))
        })), {
            color: 5592405,
            hitbox: l.fromRect(13.15, 24.16, e.create(55.3, -53.8))
        }, {
            color: 5592405,
            hitbox: l.fromRect(27.27, 13.11, e.create(19.83, -73.38))
        }, {
            color: 5592405,
            hitbox: l.fromRect(27.27, 13.11, e.create(48.2, -73.38))
        }, {
            color: 5592405,
            hitbox: new ke([e.create(5.05, -40.17), e.create(5.05, -16.47), e.create(-8.06, -16.47), e.create(-8.06, -32.29)])
        }, {
            color: 5592405,
            hitbox: new ke([e.create(61.82, -40.67), e.create(61.75, -24.97), e.create(48.71, -16.97), e.create(48.71, -40.73)])
        }],
        floors: [{
            type: "stone",
            hitbox: new ke([e.create(5.54, -80.63), e.create(62.37, -80.63), e.create(62.37, -24.57), e.create(48.11, -15.97), e.create(34.01, -15.97), e.create(34.01, 84.86), e.create(-8.82, 84.86), e.create(-8.82, -32.87), e.create(5.54, -41.2)])
        }],
        obstacles: [{
            idString: "regular_crate",
            position: e.create(63.13, -15.17)
        }, {
            idString: "regular_crate",
            position: e.create(-7.99, 2.28)
        }, {
            idString: "regular_crate",
            position: e.create(7.06, 30.07)
        }, {
            idString: "regular_crate",
            position: e.create(18.06, 27.86)
        }, {
            idString: "regular_crate",
            position: e.create(-64.29, 76.5)
        }, {
            idString: "regular_crate",
            position: e.create(65.01, -56.73)
        }, {
            idString: "regular_crate",
            position: e.create(8.45, -66.79)
        }, {
            idString: "flint_crate",
            position: e.create(33.86, -46.16),
            rotation: 0
        }, {
            idString: "barrel",
            position: e.create(-10.72, -7.93)
        }, {
            idString: "barrel",
            position: e.create(9.13, 40.34)
        }, {
            idString: "barrel",
            position: e.create(69.75, 42.55)
        }, {
            idString: "barrel",
            position: e.create(24.36, -46.95)
        }, {
            idString: "barrel",
            position: e.create(70.01, -72.17)
        }, {
            idString: "super_barrel",
            position: e.create(34.44, -55.28),
            rotation: 0
        }, {
            idString: "super_barrel",
            position: e.create(44.51, 78.15),
            rotation: 0
        }, {
            idString: "sandbags",
            position: e.create(15.15, 17.92),
            rotation: 0
        }, {
            idString: "sandbags",
            position: e.create(1.4, 78.77),
            rotation: 0
        }, {
            idString: "sandbags",
            position: e.create(18.2, 79.97),
            rotation: 0
        }, {
            idString: "sandbags",
            position: e.create(31.6, -36.18),
            rotation: 0
        }, {
            idString: "sandbags",
            position: e.create(30.66, -70.69),
            rotation: 0
        }, {
            idString: "sandbags",
            position: e.create(18.54, -67.73),
            rotation: 1
        }, {
            idString: "m1117",
            position: e.create(48.93, -53.75),
            rotation: 0
        }, {
            idString: "gun_case",
            position: e.create(30.66, -28.84),
            rotation: 0
        }, {
            idString: "gun_case",
            position: e.create(63.16, -36.39),
            rotation: 1
        }, {
            idString: "gun_case",
            position: e.create(19.48, 36.69),
            rotation: 0
        }, {
            idString: "tear_gas_crate",
            position: e.create(16.55, 9.68),
            rotation: 0
        }, {
            idString: "tear_gas_crate",
            position: e.create(33.06, -62.76),
            rotation: 0
        }, {
            idString: "grenade_crate",
            position: e.create(-55.29, 78.02),
            rotation: 0
        }, {
            idString: "grenade_crate",
            position: e.create(69.81, -34.24),
            rotation: 0
        }, {
            idString: "ammo_crate",
            position: e.create(50.07, -20.07),
            rotation: 0
        }, {
            idString: "barrier",
            position: e.create(13.91, 70.32),
            rotation: 1
        }, {
            idString: "port_fence_side",
            position: e.create(72.29, 80.72),
            rotation: 0
        }, {
            idString: "port_fence_side",
            position: e.create(72.32, -80.71),
            rotation: 1
        }, {
            idString: "port_fence_side",
            position: e.create(-72.32, -80.69),
            rotation: 2
        }, ...Array.from({
            length: 9
        }, (a, t) => ({
            idString: "port_fence",
            position: e.create(-63.89 + 8.45 * t, -84.11),
            rotation: 0
        })), ...Array.from({
            length: 3
        }, (a, t) => ({
            idString: "port_fence",
            position: e.create(21.1 + 8.45 * t, -84.11),
            rotation: 0
        })), ...Array.from({
            length: 6
        }, (a, t) => ({
            idString: "port_fence",
            position: e.create(75.75, -72.31 + 8.45 * t),
            rotation: 1
        })), ...Array.from({
            length: 9
        }, (a, t) => ({
            idString: "port_fence",
            position: e.create(75.75, 4.7 + 8.45 * t),
            rotation: 1
        })), ...Array.from({
            length: 3
        }, (a, t) => ({
            idString: "port_fence",
            position: e.create(46.95 + 8.45 * t, 84.11),
            rotation: 0
        })), ...Array.from({
            length: 6
        }, (a, t) => ({
            idString: "port_fence",
            position: e.create(-55.3 + 8.45 * t, 84.11),
            rotation: 0
        })), ...Array.from({
            length: 9
        }, (a, t) => ({
            idString: "port_fence",
            position: e.create(-75.75, 4.7 + 8.45 * t),
            rotation: 1
        })), ...Array.from({
            length: 8
        }, (a, t) => ({
            idString: "port_fence",
            position: e.create(-75.75, -72.31 + 8.45 * t),
            rotation: 1
        }))]
    }, {
        idString: "mobile_home",
        name: "Mobile Home",
        spawnHitbox: l.fromRect(65, 40),
        scopeHitbox: l.fromRect(42, 20, e.create(2, -1)),
        floorImages: [{
            key: "mobile_home_floor",
            position: e.create(0, 0)
        }],
        ceilingImages: [{
            key: "mobile_home_ceiling",
            position: e.create(2, -1),
            residue: "mobile_home_residue"
        }],
        floors: [{
            type: "wood",
            hitbox: l.fromRect(43, 20, e.create(2, -1))
        }],
        wallsToDestroy: 2,
        obstacles: [{
            idString: "door",
            position: e.create(-18.75, -4.05),
            rotation: 3
        }, {
            idString: "door",
            position: e.create(6.45, 8.33),
            rotation: 0
        }, {
            idString: "mobile_home_wall_1",
            position: e.create(-16, -10.43),
            rotation: 0
        }, {
            idString: "mobile_home_wall_1",
            position: e.create(-18.65, 4.03),
            rotation: 1
        }, {
            idString: "mobile_home_wall_2",
            position: e.create(16.45, 8.37),
            rotation: 0
        }, {
            idString: "mobile_home_wall_3",
            position: e.create(22.7, -1.03),
            rotation: 1
        }, {
            idString: "mobile_home_wall_3",
            position: e.create(11.65, -10.43),
            rotation: 0
        }, {
            idString: "mobile_home_wall_3",
            position: e.create(-9.35, 8.32),
            rotation: 0
        }, {
            idString: "mobile_home_bed",
            position: e.create(13.55, -5.72),
            rotation: 3
        }, {
            idString: "small_drawer",
            position: e.create(17.45, 3.27),
            rotation: 3
        }, {
            idString: "mobile_home_sink",
            position: e.create(-12.8, 3.4),
            rotation: 2
        }, {
            idString: "mobile_home_stove",
            position: e.create(-3.75, 3.57),
            rotation: 2
        }, {
            idString: "mobile_home_tire",
            position: e.create(-21.25, 4.85),
            rotation: 0
        }, {
            idString: "mobile_home_window",
            position: e.create(-5.6, -10.42),
            rotation: 0
        }, {
            idString: "box",
            position: e.create(26.2, -3.43),
            rotation: 0
        }, {
            idString: "box",
            position: e.create(28, 1.52),
            rotation: 0
        }, {
            idString: "barrel",
            position: e.create(-18.9, 14.62),
            rotation: 0
        }]
    }]),
    qi = ["tree", "stone", "bush", "crate", "metal", "wood", "pumpkin", "glass", "porcelain", "cardboard", "appliance", "large_refinery_barrel", "sand", "fence"];
var te = (a => (a[a.Full = 0] = "Full", a[a.Limited = 1] = "Limited", a[a.Binary = 2] = "Binary", a[a.None = 3] = "None", a))(te || {});

function Xe(a, t, i) {
    return {
        idString: a,
        name: t,
        material: "crate",
        health: 80,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .5
        },
        spawnMode: oe.GrassAndSand,
        rotationMode: 2,
        hitbox: l.fromRect(9.2, 9.2),
        hasLoot: !0,
        ...i
    }
}

function Ge(a, t) {
    return {
        idString: `house_wall_${a}`,
        name: `House Wall ${a}`,
        material: "wood",
        noResidue: !0,
        health: 170,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .95
        },
        hitbox: t,
        rotationMode: 1,
        allowFlyover: 2,
        frames: {
            particle: "wall_particle"
        },
        role: H.Wall
    }
}

function Se(a, t, i, o, r) {
    return {
        idString: a,
        name: t,
        material: "stone",
        health: 500,
        indestructible: o,
        noResidue: !0,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .95
        },
        hitbox: i,
        rotationMode: 1,
        role: H.Wall,
        allowFlyover: 2,
        particleVariations: 2,
        variations: r,
        frames: {
            particle: "rock_particle"
        }
    }
}

function dt(a, t) {
    return {
        idString: `mobile_home_wall_${a}`,
        name: `Mobile Home Wall ${a}`,
        material: "appliance",
        noResidue: !0,
        health: 240,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .95
        },
        hitbox: t,
        rotationMode: 1,
        allowFlyover: 2,
        frames: {
            particle: "briefcase_particle"
        },
        role: H.Wall
    }
}

function Be(a, t, i) {
    let o;
    switch (t) {
        case "open2":
            o = new B(l.fromRect(1.85, 28, e.create(6.1, 0)), l.fromRect(1.85, 28, e.create(-6.1, 0)));
            break;
        case "open1":
            o = new B(l.fromRect(1.85, 28, e.create(6.1, 0)), l.fromRect(1.85, 28, e.create(-6.1, 0)), l.fromRect(14, 1.85, e.create(0, -13.04)));
            break;
        case "closed":
        default:
            o = l.fromRect(14, 28);
            break
    }
    const r = t === "closed";
    return {
        idString: `container_walls_${a}`,
        name: `Container Walls ${a}`,
        material: "metal",
        health: 500,
        indestructible: !0,
        noResidue: !0,
        hideOnMap: r || void 0,
        invisible: r || void 0,
        hitbox: o,
        rotationMode: 1,
        allowFlyover: 2,
        role: H.Wall,
        reflectBullets: !0,
        zIndex: R.BuildingsFloor + 1,
        frames: {
            base: r ? void 0 : `container_walls_${t}`,
            particle: "metal_particle"
        },
        tint: i
    }
}

function mt(a, t, i) {
    return {
        idString: a,
        name: t,
        material: "wood",
        health: 60,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .95
        },
        hasLoot: !0,
        hitbox: i ?? new B(l.fromRect(8.2, .95, e.create(0, -1.32)), l.fromRect(.75, 2.75, e.create(0, .48)), l.fromRect(.75, 2.75, e.create(-3.11, .48)), l.fromRect(.75, 2.75, e.create(3.17, .48))),
        rotationMode: 1,
        frames: {
            particle: "furniture_particle",
            residue: "gun_mount_residue"
        }
    }
}
const nt = new ae([{
        idString: "oak_tree",
        name: "Oak Tree",
        material: "tree",
        health: 180,
        scale: {
            spawnMin: .9,
            spawnMax: 1,
            destroy: .75
        },
        hitbox: new b(5.5),
        spawnHitbox: new b(15),
        rotationMode: 0,
        variations: 3,
        zIndex: R.ObstaclesLayer4,
        allowFlyover: 2
    }, {
        idString: "viking_chest",
        name: "Viking Chest",
        material: "wood",
        health: 150,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .7
        },
        hitbox: l.fromRect(12, 7, e.create(0, -.4)),
        rotationMode: 1,
        hasLoot: !0,
        hideOnMap: !0,
        spawnMode: oe.Beach,
        allowFlyover: 0
    }, {
        idString: "pine_tree",
        name: "Pine Tree",
        material: "tree",
        health: 180,
        scale: {
            spawnMin: .9,
            spawnMax: 1.1,
            destroy: .75
        },
        hitbox: new b(7),
        spawnHitbox: new b(15),
        rotationMode: 0,
        zIndex: R.ObstaclesLayer4,
        allowFlyover: 2
    }, {
        idString: "birch_tree",
        name: "Birch Tree",
        material: "tree",
        health: 240,
        scale: {
            spawnMin: .9,
            spawnMax: 1,
            destroy: .75
        },
        hitbox: new b(5.5),
        spawnHitbox: new b(15),
        rotationMode: 0,
        zIndex: R.ObstaclesLayer4,
        allowFlyover: 2
    }, {
        idString: "christmas_tree",
        name: "Christmas Tree",
        material: "tree",
        health: 720,
        scale: {
            spawnMin: .9,
            spawnMax: 1.1,
            destroy: .75
        },
        hitbox: new b(10),
        spawnHitbox: new b(15),
        rotationMode: 0,
        zIndex: R.ObstaclesLayer4,
        allowFlyover: 2,
        hasLoot: !0
    }, {
        idString: "rock",
        name: "Rock",
        material: "stone",
        health: 200,
        scale: {
            spawnMin: .9,
            spawnMax: 1.1,
            destroy: .5
        },
        spawnMode: oe.GrassAndSand,
        hitbox: new b(4),
        spawnHitbox: new b(4.5),
        rotationMode: 0,
        variations: 7,
        particleVariations: 2
    }, {
        idString: "river_rock",
        name: "River Rock",
        material: "stone",
        health: 550,
        scale: {
            spawnMin: .9,
            spawnMax: 1.1,
            destroy: .5
        },
        spawnMode: oe.River,
        hitbox: new b(7),
        spawnHitbox: new b(8),
        rotationMode: 0,
        variations: 5,
        particleVariations: 2
    }, {
        idString: "pumpkin",
        name: "Pumpkin",
        material: "pumpkin",
        health: 100,
        scale: {
            spawnMin: .9,
            spawnMax: 1.1,
            destroy: .5
        },
        hitbox: new b(2.4),
        spawnHitbox: new b(3),
        rotationMode: 0,
        allowFlyover: 0,
        hasLoot: !0
    }, {
        idString: "flint_stone",
        name: "Flint Stone",
        material: "stone",
        health: 200,
        impenetrable: !0,
        hasLoot: !0,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .5
        },
        spawnMode: oe.GrassAndSand,
        hitbox: l.fromRect(6.1, 6.1),
        rotationMode: 3,
        particleVariations: 2
    }, {
        idString: "bush",
        name: "Bush",
        material: "bush",
        health: 80,
        scale: {
            spawnMin: .9,
            spawnMax: 1.1,
            destroy: .8
        },
        hitbox: new b(4.2),
        noCollisions: !0,
        rotationMode: 0,
        particleVariations: 2,
        zIndex: R.ObstaclesLayer3
    }, {
        idString: "blueberry_bush",
        name: "Blueberry Bush",
        material: "bush",
        health: 80,
        scale: {
            spawnMin: .9,
            spawnMax: 1.1,
            destroy: .8
        },
        hitbox: new b(4.2),
        noCollisions: !0,
        rotationMode: 0,
        particleVariations: 2,
        zIndex: R.ObstaclesLayer3,
        spawnWithLoot: !0,
        frames: {
            particle: "bush_particle",
            residue: "bush_residue"
        }
    }, Xe("regular_crate", "Regular Crate", {
        rotationMode: 2,
        frames: {
            particle: "crate_particle",
            residue: "regular_crate_residue"
        }
    }), Xe("flint_crate", "Flint Crate", {
        rotationMode: 3,
        hideOnMap: !0
    }), Xe("aegis_crate", "AEGIS Crate", {
        rotationMode: 3,
        hideOnMap: !0
    }), Xe("grenade_crate", "Grenade Crate", {
        hitbox: l.fromRect(6.5, 6.3),
        rotationMode: 3,
        allowFlyover: 0
    }), {
        idString: "melee_crate",
        name: "Melee Crate",
        material: "crate",
        health: 100,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .6
        },
        spawnMode: oe.GrassAndSand,
        hitbox: l.fromRect(6.1, 6.1),
        rotationMode: 3,
        allowFlyover: 0,
        hasLoot: !0,
        frames: {
            particle: "crate_particle",
            residue: "regular_crate_residue"
        }
    }, {
        idString: "ammo_crate",
        name: "Ammo Crate",
        material: "cardboard",
        health: 160,
        impenetrable: !0,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .6
        },
        spawnMode: oe.GrassAndSand,
        hitbox: l.fromRect(8.5, 8.5),
        rotationMode: 1,
        hasLoot: !0,
        frames: {
            particle: "crate_particle"
        }
    }, {
        idString: "tear_gas_crate",
        name: "Tear Gas Crate",
        material: "crate",
        health: 100,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .6
        },
        spawnMode: oe.GrassAndSand,
        hitbox: l.fromRect(9.15, 6.3),
        rotationMode: 1,
        allowFlyover: 0,
        frames: {
            particle: "crate_particle",
            residue: "regular_crate_residue"
        },
        particlesOnDestroy: {
            type: "tear_gas_particle",
            count: 10,
            deployAnimation: {
                duration: 4e3,
                staggering: {
                    delay: 300,
                    initialAmount: 2
                }
            },
            spawnRadius: 15
        },
        additionalDestroySounds: ["smoke_grenade"]
    }, {
        idString: "barrel",
        name: "Barrel",
        material: "metal",
        health: 160,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .5
        },
        spawnMode: oe.GrassAndSand,
        hitbox: new b(3.65),
        rotationMode: 0,
        explosion: "barrel_explosion",
        reflectBullets: !0
    }, {
        idString: "super_barrel",
        name: "Super Barrel",
        material: "metal",
        health: 240,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .5
        },
        spawnMode: oe.GrassAndSand,
        hitbox: new b(3.65),
        rotationMode: 0,
        explosion: "super_barrel_explosion",
        reflectBullets: !0
    }, {
        idString: "oil_tank",
        name: "Oil Tank",
        material: "metal",
        health: 1e3,
        indestructible: !0,
        hitbox: new B(l.fromRect(16.8, 13.6), l.fromRect(26, 2), new b(5, e.create(-8, 1.8)), new b(5, e.create(-8, -1.8)), new b(5, e.create(8, 1.8)), new b(5, e.create(8, -1.8))),
        spawnHitbox: l.fromRect(28, 18),
        rotationMode: 1,
        allowFlyover: 2,
        noResidue: !0,
        frames: {
            particle: "metal_particle"
        },
        reflectBullets: !0
    }, {
        idString: "small_bridge",
        name: "Small Bridge",
        material: "wood",
        health: 1e3,
        indestructible: !0,
        hitbox: new B(l.fromRect(44, 2, e.create(0, 6)), l.fromRect(44, 2, e.create(0, -6)), new b(1.3, e.create(-22, 6.6)), new b(1.3, e.create(-10.09, 6.6)), new b(1.3, e.create(.1, 6.6)), new b(1.3, e.create(10.3, 6.6)), new b(1.3, e.create(22, 6.6)), new b(1.3, e.create(-22, -6.7)), new b(1.3, e.create(-10.09, -6.7)), new b(1.3, e.create(.1, -6.7)), new b(1.3, e.create(10.3, -6.7)), new b(1.3, e.create(22, -6.7))),
        spawnHitbox: l.fromRect(28, 18),
        rotationMode: 1,
        noResidue: !0,
        frames: {
            particle: "wall_particle"
        },
        noBulletCollision: !0,
        spawnMode: oe.River
    }, {
        idString: "airdrop_crate_locked",
        name: "Airdrop",
        material: "metal",
        health: 1e4,
        indestructible: !0,
        reflectBullets: !0,
        hitbox: l.fromRect(8.7, 8.7),
        spawnHitbox: l.fromRect(10, 10),
        rotationMode: 3,
        hideOnMap: !0,
        role: H.Activatable,
        zIndex: R.ObstaclesLayer2,
        interactText: "Open",
        sound: {
            name: "airdrop_unlock",
            maxRange: 64,
            falloff: .3
        },
        replaceWith: {
            idString: {
                airdrop_crate: .95,
                gold_airdrop_crate: .05
            },
            delay: 800
        },
        noResidue: !0,
        frames: {
            particle: "metal_particle"
        }
    }, {
        idString: "airdrop_crate",
        name: "Airdrop Crate",
        material: "crate",
        health: 150,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .5
        },
        hitbox: new B(l.fromRect(8.7, 8.7)),
        spawnHitbox: l.fromRect(10, 10),
        hideOnMap: !0,
        rotationMode: 3,
        hasLoot: !0
    }, {
        idString: "gold_airdrop_crate",
        name: "Gold Airdrop Crate",
        material: "crate",
        health: 170,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .5
        },
        hitbox: new B(l.fromRect(8.7, 8.7)),
        spawnHitbox: l.fromRect(10, 10),
        rotationMode: 3,
        hideOnMap: !0,
        hasLoot: !0,
        frames: {
            particle: "airdrop_crate_particle"
        }
    }, {
        idString: "gold_rock",
        name: "Gold Rock",
        material: "stone",
        hideOnMap: !0,
        health: 250,
        scale: {
            spawnMin: .9,
            spawnMax: 1.1,
            destroy: .3
        },
        hitbox: new b(4),
        spawnHitbox: new b(4.5),
        rotationMode: 0,
        hasLoot: !0
    }, {
        idString: "warehouse_walls",
        name: "Warehouse Wall",
        material: "metal",
        health: 1e3,
        indestructible: !0,
        hideOnMap: !0,
        hitbox: new B(l.fromRect(1.7, 70.6), l.fromRect(12, 1.7, e.create(5.5, -34.5)), l.fromRect(12, 1.7, e.create(5.5, 34.5))),
        rotationMode: 1,
        allowFlyover: 2,
        reflectBullets: !0,
        noResidue: !0,
        invisible: !0,
        frames: {
            particle: "metal_particle"
        }
    }, {
        idString: "box",
        name: "Box",
        material: "cardboard",
        health: 60,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .8
        },
        hitbox: l.fromRect(4.4, 4.4),
        rotationMode: 1,
        variations: 3,
        zIndex: R.ObstaclesLayer2,
        hasLoot: !0
    }, {
        idString: "metal_shelf",
        name: "Metal Shelf",
        material: "metal",
        health: 1e3,
        indestructible: !0,
        noMeleeCollision: !0,
        hideOnMap: !0,
        hitbox: l.fromRect(25.5, 6.6),
        rotationMode: 1,
        noResidue: !0,
        frames: {
            particle: "metal_particle"
        },
        zIndex: R.ObstaclesLayer1 - 3,
        reflectBullets: !0
    }, Ge("1", l.fromRect(9, 2)), Ge("2", l.fromRect(20.86, 2)), Ge("3", l.fromRect(11.4, 2)), Ge("4", l.fromRect(21.4, 2)), Ge("5", l.fromRect(16, 2)), {
        idString: "fridge",
        name: "Fridge",
        material: "appliance",
        health: 140,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .8
        },
        hasLoot: !0,
        hitbox: l.fromRect(9.1, 6.45, e.create(0, -.45)),
        rotationMode: 1,
        allowFlyover: 2,
        frames: {
            particle: "metal_particle"
        },
        reflectBullets: !0
    }, {
        idString: "stove",
        name: "Stove",
        material: "metal",
        health: 140,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .8
        },
        hitbox: l.fromRect(9.1, 6.45, e.create(0, -.45)),
        rotationMode: 1,
        explosion: "stove_explosion",
        frames: {
            particle: "metal_particle"
        },
        reflectBullets: !0
    }, {
        idString: "washing_machine",
        name: "Washing Machine",
        material: "appliance",
        health: 140,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .8
        },
        hasLoot: !0,
        hitbox: l.fromRect(9.1, 6.45, e.create(0, -.45)),
        rotationMode: 1,
        reflectBullets: !0
    }, {
        idString: "house_exterior",
        name: "House Exterior",
        material: "stone",
        health: 1e3,
        indestructible: !0,
        hideOnMap: !0,
        invisible: !0,
        allowFlyover: 2,
        hitbox: new B(l.fromRect(14.33, 2, e.create(-41.16, -34.15)), l.fromRect(17, 2, e.create(-15, -34.15)), l.fromRect(44.33, 2, e.create(26.16, -34.15)), l.fromRect(2, 22.3, e.create(12.88, -22.05)), l.fromRect(2, 42.68, e.create(47.36, -11.86)), l.fromRect(5.38, 2, e.create(43.74, 8.53)), l.fromRect(5.51, 2, e.create(16.62, 8.54)), l.fromRect(2, 22.7, e.create(12.88, 10.15)), l.fromRect(40.06, 2, e.create(-6.17, 22.54)), l.fromRect(12.08, 2, e.create(-42.29, 22.54)), l.fromRect(2, 22.2, e.create(-47.36, -22.1)), l.fromRect(2, 24, e.create(-47.36, 11.5)), l.fromRect(3.25, 3.25, e.create(-40.27, 33.56)), l.fromRect(3.25, 3.25, e.create(-22.48, 33.56))),
        rotationMode: 1,
        noResidue: !0,
        frames: {
            particle: "wall_particle"
        }
    }, {
        idString: "door",
        name: "Door",
        material: "wood",
        health: 120,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: 1
        },
        hitbox: l.fromRect(10.15, 1.6, e.create(-.44, 0)),
        rotationMode: 1,
        noResidue: !0,
        role: H.Door,
        hingeOffset: e.create(-5.5, 0),
        zIndex: R.ObstaclesLayer3,
        frames: {
            particle: "furniture_particle"
        }
    }, {
        idString: "vault_door",
        name: "Vault Door",
        material: "metal",
        health: 1e3,
        indestructible: !0,
        reflectBullets: !0,
        hitbox: l.fromRect(14.2, 1.9, e.create(1.1, -.4)),
        rotationMode: 1,
        role: H.Door,
        locked: !0,
        openOnce: !0,
        doorSound: "vault_door",
        animationDuration: 2e3,
        hingeOffset: e.create(-6.1, -.8),
        zIndex: R.ObstaclesLayer3,
        frames: {
            particle: "metal_particle"
        }
    }, {
        idString: "toilet",
        name: "Toilet",
        material: "porcelain",
        health: 100,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .8
        },
        hitbox: new b(2.5),
        allowFlyover: 0,
        rotationMode: 1,
        hasLoot: !0
    }, {
        idString: "used_toilet",
        name: "Used Toilet",
        material: "porcelain",
        health: 100,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .8
        },
        hitbox: new b(2.5),
        allowFlyover: 0,
        rotationMode: 1,
        hasLoot: !0,
        frames: {
            particle: "toilet_particle",
            residue: "toilet_residue"
        }
    }, {
        idString: "small_drawer",
        name: "Small Drawer",
        material: "wood",
        health: 80,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .8
        },
        hitbox: l.fromRect(6.2, 6, e.create(0, -.5)),
        rotationMode: 1,
        allowFlyover: 0,
        hasLoot: !0,
        frames: {
            particle: "furniture_particle"
        }
    }, {
        idString: "large_drawer",
        name: "Large Drawer",
        material: "wood",
        health: 80,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .8
        },
        hideOnMap: !0,
        hitbox: l.fromRect(12.5, 6, e.create(0, -.5)),
        rotationMode: 1,
        allowFlyover: 0,
        hasLoot: !0,
        frames: {
            particle: "furniture_particle"
        }
    }, {
        idString: "couch",
        name: "Couch",
        material: "wood",
        health: 100,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .9
        },
        hideOnMap: !0,
        hitbox: l.fromRect(7, 15.8, e.create(-.2, 0)),
        rotationMode: 1,
        frames: {
            particle: "furniture_particle"
        }
    }, {
        idString: "tv",
        name: "TV",
        material: "glass",
        health: 100,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .9
        },
        hideOnMap: !0,
        hitbox: l.fromRect(1.1, 15.1, e.create(-.25, 0)),
        rotationMode: 1,
        zIndex: R.ObstaclesLayer2,
        frames: {
            particle: "metal_particle"
        }
    }, {
        idString: "table",
        name: "Table",
        material: "wood",
        health: 100,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .9
        },
        hideOnMap: !0,
        hitbox: l.fromRect(8.3, 12.2),
        rotationMode: 1,
        frames: {
            particle: "furniture_particle"
        },
        zIndex: R.ObstaclesLayer3,
        noCollisions: !0
    }, {
        idString: "chair",
        name: "Chair",
        material: "wood",
        health: 100,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .9
        },
        hideOnMap: !0,
        hitbox: l.fromRect(6.8, 6.7, e.create(0, 0)),
        rotationMode: 1,
        frames: {
            particle: "furniture_particle"
        }
    }, {
        idString: "bookshelf",
        name: "Bookshelf",
        material: "wood",
        health: 80,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .8
        },
        hideOnMap: !0,
        variations: 2,
        allowFlyover: 0,
        hitbox: l.fromRect(12.49, 4.24),
        rotationMode: 1,
        hasLoot: !0,
        frames: {
            particle: "furniture_particle"
        }
    }, {
        idString: "window",
        name: "Window",
        material: "glass",
        health: 20,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .95
        },
        hideOnMap: !0,
        hitbox: l.fromRect(1.8, 9.4),
        zIndex: R.ObstaclesLayer2,
        allowFlyover: 2,
        rotationMode: 1,
        role: H.Window
    }, {
        idString: "ship_cabin_window",
        name: "Ship Cabin Window",
        material: "glass",
        health: 20,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .95
        },
        hitbox: l.fromRect(1.8, 9.4),
        allowFlyover: 2,
        rotationMode: 1,
        role: H.Window
    }, {
        idString: "bed",
        name: "Bed",
        material: "wood",
        health: 100,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .9
        },
        hideOnMap: !0,
        hitbox: l.fromRect(11.2, 16),
        rotationMode: 1,
        allowFlyover: 0,
        frames: {
            particle: "furniture_particle"
        }
    }, {
        idString: "bunk_bed",
        name: "Bunk Bed",
        material: "metal",
        health: 1e3,
        indestructible: !0,
        reflectBullets: !0,
        hideOnMap: !0,
        hitbox: l.fromRect(8.2, 15.6, e.create(.4, 0)),
        rotationMode: 1,
        allowFlyover: 0,
        frames: {
            particle: "metal_particle"
        }
    }, {
        idString: "garage_door",
        name: "Garage Door",
        material: "wood",
        health: 200,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .95
        },
        hideOnMap: !0,
        hitbox: l.fromRect(21.7, 1.5, e.create(0, -.4)),
        rotationMode: 1,
        allowFlyover: 2,
        frames: {
            particle: "furniture_particle"
        }
    }, {
        idString: "porta_potty_toilet_open",
        name: "Porta Potty Toilet Open",
        material: "porcelain",
        health: 100,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .9
        },
        hideOnMap: !0,
        hitbox: l.fromRect(12.13, 4.3, e.create(.02, -1.05)),
        rotationMode: 1,
        allowFlyover: 0,
        hasLoot: !0,
        frames: {
            particle: "porta_potty_toilet_particle",
            residue: "porta_potty_toilet_residue"
        }
    }, {
        idString: "porta_potty_toilet_closed",
        name: "Porta Potty Toilet Closed",
        material: "porcelain",
        health: 100,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .9
        },
        hideOnMap: !0,
        hitbox: l.fromRect(12, 4.3, e.create(0, -1.05)),
        rotationMode: 1,
        allowFlyover: 0,
        hasLoot: !0,
        frames: {
            particle: "porta_potty_toilet_particle",
            residue: "porta_potty_toilet_residue"
        }
    }, {
        idString: "porta_potty_back_wall",
        name: "Porta Potty Back Wall",
        material: "wood",
        health: 100,
        noResidue: !0,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .9
        },
        hideOnMap: !0,
        hitbox: l.fromRect(12.8, 1.6, e.create(0, 0)),
        rotationMode: 1,
        allowFlyover: 2,
        role: H.Wall,
        frames: {
            particle: "porta_potty_wall_particle"
        }
    }, {
        idString: "porta_potty_door",
        name: "Porta Potty Door",
        material: "wood",
        health: 100,
        noResidue: !0,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: 1
        },
        hideOnMap: !0,
        hitbox: l.fromRect(9.2, 1.4, e.create(-.8, 0)),
        rotationMode: 1,
        allowFlyover: 2,
        role: H.Door,
        hingeOffset: e.create(-5.5, 0)
    }, {
        idString: "porta_potty_front_wall",
        name: "Porta Potty Front Wall",
        material: "wood",
        health: 100,
        noResidue: !0,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .9
        },
        hideOnMap: !0,
        hitbox: l.fromRect(3, 1.6),
        rotationMode: 1,
        allowFlyover: 2,
        role: H.Wall,
        frames: {
            particle: "porta_potty_wall_particle"
        }
    }, {
        idString: "porta_potty_sink_wall",
        name: "Porta Potty Sink Wall",
        material: "wood",
        health: 100,
        noResidue: !0,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .9
        },
        hideOnMap: !0,
        hitbox: l.fromRect(19.2, 1.9, e.create(0, 1.25)),
        rotationMode: 1,
        allowFlyover: 2,
        role: H.Wall,
        zIndex: R.ObstaclesLayer2,
        frames: {
            particle: "porta_potty_wall_particle"
        }
    }, {
        idString: "porta_potty_toilet_paper_wall",
        name: "Porta Potty Toilet Paper Wall",
        material: "wood",
        health: 100,
        noResidue: !0,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .9
        },
        hideOnMap: !0,
        hitbox: l.fromRect(19.2, 1.7, e.create(0, -1.15)),
        rotationMode: 1,
        allowFlyover: 2,
        role: H.Wall,
        zIndex: R.ObstaclesLayer2,
        frames: {
            particle: "porta_potty_wall_particle"
        }
    }, Se("concrete_wall_end", "Concrete Wall End", l.fromRect(2.4, 2), !0), Se("concrete_wall_end_broken", "Concrete Wall End Broken", l.fromRect(2.4, 2), !0, 2), Se("concrete_wall_segment", "Concrete Wall Segment", l.fromRect(16, 2), !0), Se("concrete_wall_segment_long", "Concrete Wall Segment Long", l.fromRect(32, 2), !0), Se("concrete_wall_corner", "Concrete Wall Corner", l.fromRect(2, 2), !0), Se("inner_concrete_wall_1", "Inner Concrete Wall 1", l.fromRect(10.8, 1.9)), Se("inner_concrete_wall_2", "Inner Concrete Wall 2", l.fromRect(36.7, 1.9)), Se("inner_concrete_wall_3", "Inner Concrete Wall 3", l.fromRect(39.14, 1.9)), Se("inner_concrete_wall_4", "Inner Concrete Wall 4", l.fromRect(47.14, 1.9)), {
        idString: "refinery_walls",
        name: "Refinery Walls",
        material: "stone",
        health: 1e3,
        indestructible: !0,
        hideOnMap: !0,
        invisible: !0,
        hitbox: new B(l.fromRect(57, 1.8, e.create(-22, -36.1)), l.fromRect(30.75, 1.8, e.create(35.38, -36.1)), l.fromRect(2, 33.5, e.create(49.75, -22.25)), l.fromRect(16.25, 2.05, e.create(42.63, -6.53)), l.fromRect(38.5, 2.05, e.create(2.25, -6.53)), l.fromRect(2, 21.55, e.create(-16, 3.23)), l.fromRect(2, 13.5, e.create(-16, 30.25)), l.fromRect(35.5, 2, e.create(-32.75, 36.25)), l.fromRect(2, 74, e.create(-49.5, 0)), l.fromRect(13.3, 2, e.create(-43.35, 9)), l.fromRect(10.5, 2, e.create(-21.25, 9))),
        rotationMode: 1,
        allowFlyover: 2,
        particleVariations: 2,
        noResidue: !0,
        frames: {
            particle: "rock_particle"
        }
    }, {
        idString: "small_refinery_barrel",
        name: "Small Refinery Barrel",
        material: "metal",
        health: 250,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .5
        },
        hitbox: new b(6.8),
        rotationMode: 0,
        allowFlyover: 2,
        explosion: "small_refinery_barrel_explosion",
        reflectBullets: !0,
        frames: {
            particle: "barrel_particle",
            residue: "barrel_residue"
        }
    }, {
        idString: "large_refinery_barrel",
        name: "Large Refinery Barrel",
        material: "large_refinery_barrel",
        health: 3500,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .5
        },
        hitbox: new b(17.15),
        rotationMode: 0,
        allowFlyover: 2,
        explosion: "large_refinery_barrel_explosion",
        reflectBullets: !0,
        zIndex: R.ObstaclesLayer5,
        frames: {
            particle: "barrel_particle"
        }
    }, {
        idString: "large_oil_tank",
        name: "Large Oil Tank",
        material: "large_refinery_barrel",
        health: 1e3,
        indestructible: !0,
        reflectBullets: !0,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .5
        },
        hitbox: new b(28),
        rotationMode: 0,
        allowFlyover: 2,
        frames: {
            particle: "barrel_particle"
        }
    }, {
        idString: "smokestack",
        name: "Smokestack",
        material: "metal",
        health: 500,
        indestructible: !0,
        hitbox: new b(8.9),
        rotationMode: 1,
        reflectBullets: !0,
        allowFlyover: 2,
        zIndex: R.ObstaclesLayer5,
        noResidue: !0,
        frames: {
            particle: "barrel_particle"
        }
    }, {
        idString: "distillation_column",
        name: "Distillation Column",
        material: "metal",
        health: 500,
        indestructible: !0,
        hitbox: new B(new b(5.22, e.create(0, -.65)), new b(4.9, e.create(0, .9))),
        rotationMode: 1,
        allowFlyover: 2,
        reflectBullets: !0,
        zIndex: R.ObstaclesLayer5,
        noResidue: !0,
        frames: {
            particle: "barrel_particle"
        }
    }, {
        idString: "distillation_equipment",
        name: "Distillation Equipment",
        material: "metal",
        health: 500,
        indestructible: !0,
        hitbox: new B(new b(3, e.create(-11.3, -3.85)), new b(3, e.create(-11.3, -6.55)), l.fromRect(17.5, 3.5, e.create(-5.55, -5.25)), l.fromRect(14.2, 8.5, e.create(-3.9, -5.15)), new b(3.15, e.create(.72, 5.62)), new b(4.4, e.create(8.95, 5.62)), new b(5.35, e.create(8.95, -4.7)), l.fromRect(1.8, 3.7, e.create(.65, .85)), l.fromRect(2.6, 1.2, e.create(8.95, 1)), l.fromRect(1.6, 1.75, e.create(4.2, 5.53)), l.fromRect(1.9, -2.6, e.create(4.05, -6.65))),
        rotationMode: 1,
        allowFlyover: 2,
        reflectBullets: !0,
        noResidue: !0,
        frames: {
            particle: "barrel_particle"
        }
    }, mt("gun_mount_mcx_spear", "Gun Mount MCX Spear"), mt("gun_mount_stoner_63", "Gun Mount Stoner 63"), mt("gun_mount_maul", "Gun Mount Maul", new B(l.fromRect(5.05, 1, e.create(0, -1.3)), l.fromRect(.8, 3, e.create(-1.55, .35)), l.fromRect(.8, 3, e.create(1.55, .35)))), {
        idString: "small_house_exterior",
        name: "Small House Exterior",
        material: "stone",
        health: 1e3,
        indestructible: !0,
        hideOnMap: !0,
        invisible: !0,
        hitbox: new B(l.fromRect(2, 9, e.create(-31, 26)), l.fromRect(2, 22, e.create(-31, .2)), l.fromRect(2, 9.8, e.create(-31, -25)), l.fromRect(19.8, 2, e.create(22, 29.5)), l.fromRect(8.2, 2, e.create(-26, 29.5)), l.fromRect(14, 2, e.create(-4.6, 29.5)), l.fromRect(2, 32, e.create(30.9, 13.5)), l.fromRect(2, 16, e.create(30.9, -20.5)), l.fromRect(12.3, 2, e.create(25.8, -28.9)), l.fromRect(39.4, 2, e.create(-10.45, -28.9))),
        rotationMode: 1,
        allowFlyover: 2,
        noResidue: !0,
        frames: {
            particle: "wall_particle"
        }
    }, {
        idString: "truck",
        name: "Truck",
        material: "metal",
        health: 1e3,
        indestructible: !0,
        hitbox: new B(l.fromRect(20.25, 2.15, e.create(0, 25.1)), l.fromRect(18.96, 9.2, e.create(0, 19.4)), l.fromRect(16.7, 23.5, e.create(0, 3)), l.fromRect(4.75, 15.9, e.create(0, -16.65)), l.fromRect(17, 6.9, e.create(0, -13.2)), l.fromRect(17, 6.9, e.create(0, -20.7)), l.fromRect(16.55, 1.6, e.create(0, -25.35))),
        reflectBullets: !0,
        rotationMode: 1,
        allowFlyover: 2,
        zIndex: R.ObstaclesLayer3,
        frames: {
            particle: "metal_particle"
        }
    }, {
        idString: "trailer",
        name: "Trailer",
        material: "metal",
        health: 1e3,
        indestructible: !0,
        reflectBullets: !0,
        hitbox: new B(l.fromRect(14.9, 44.7, e.create(-.05, 0)), l.fromRect(15.9, 6.4, e.create(0, -11.2)), l.fromRect(15.9, 6.4, e.create(0, -18.2)), l.fromRect(15.5, 1.5, e.create(0, -22.5)), l.fromRect(9.75, 1, e.create(-.05, 22.75))),
        rotationMode: 1,
        allowFlyover: 2,
        zIndex: R.ObstaclesLayer4,
        noResidue: !0,
        frames: {
            particle: "metal_particle"
        }
    }, {
        idString: "tango_crate",
        name: "Tango crate",
        material: "wood",
        health: 120,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .7
        },
        hitbox: l.fromRect(15, 6.5),
        rotationMode: 1,
        allowFlyover: 0,
        hasLoot: !0
    }, {
        idString: "panel_with_a_button",
        name: "Control Panel",
        material: "metal",
        health: 200,
        reflectBullets: !0,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .7
        },
        hitbox: l.fromRect(11, 8),
        rotationMode: 1,
        explosion: "control_panel_explosion",
        role: H.Activatable,
        interactText: "Activate",
        replaceWith: {
            idString: "panel_with_the_button_pressed",
            delay: 0
        },
        sound: {
            names: ["button_press", "puzzle_solved"]
        },
        frames: {
            particle: "barrel_particle",
            residue: "barrel_residue"
        }
    }, {
        idString: "panel_with_the_button_pressed",
        name: "Panel with the button pressed",
        material: "metal",
        health: 200,
        reflectBullets: !0,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .7
        },
        hitbox: l.fromRect(11, 8),
        rotationMode: 1,
        explosion: "control_panel_explosion",
        frames: {
            particle: "barrel_particle",
            residue: "barrel_residue"
        }
    }, {
        idString: "panel_without_button",
        name: "Panel without button",
        material: "metal",
        health: 200,
        reflectBullets: !0,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .7
        },
        hitbox: l.fromRect(11, 8),
        rotationMode: 1,
        explosion: "control_panel_explosion",
        frames: {
            particle: "barrel_particle",
            residue: "barrel_residue"
        }
    }, {
        idString: "panel_without_button_small",
        name: "Panel without button small",
        material: "metal",
        health: 200,
        reflectBullets: !0,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .7
        },
        hitbox: l.fromRect(7.5, 8),
        rotationMode: 1,
        explosion: "control_panel_explosion",
        frames: {
            particle: "barrel_particle",
            residue: "barrel_residue"
        }
    }, {
        idString: "crane_base_end",
        name: "Crane Base End",
        material: "metal",
        health: 1e4,
        indestructible: !0,
        zIndex: R.BuildingsFloor,
        hitbox: l.fromRect(4.5, 1.8),
        rotationMode: 1,
        frames: {
            particle: "metal_particle"
        }
    }, {
        idString: "crane_base_part",
        name: "Crane Base Part",
        material: "metal",
        health: 1e4,
        indestructible: !0,
        reflectBullets: !0,
        hitbox: new B(l.fromRect(6.1, 15.5, e.create(0, 0)), l.fromRect(5.3, 6, e.create(0, 10.97)), l.fromRect(4.2, 1.8, e.create(0, 14.8)), l.fromRect(5.3, 6, e.create(0, -10.97)), l.fromRect(4.2, 1.8, e.create(0, -14.8))),
        zIndex: R.ObstaclesLayer4,
        allowFlyover: 2,
        rotationMode: 1,
        frames: {
            particle: "metal_particle"
        }
    }, {
        idString: "crane_base",
        name: "crane base",
        material: "metal",
        health: 1e4,
        indestructible: !0,
        invisible: !0,
        hitbox: new B(l.fromRect(6, 15.5, e.create(-29.6, 77.7 + .6)), l.fromRect(5.45, 6, e.create(-29.6, 66.7 + .6)), l.fromRect(2, 1.8, e.create(-30.8, 62.9 + .6)), l.fromRect(2, 1.8, e.create(-28.5, 62.8 + .6)), l.fromRect(5.45, 6, e.create(-29.6, 88.6 + .6)), l.fromRect(2, 1.8, e.create(-30.8, 92.6 + .6)), l.fromRect(2, 1.8, e.create(-28.5, 92.6 + .6)), l.fromRect(6, 15.5, e.create(-29.6, 29.5 + .6)), l.fromRect(5.45, 6, e.create(-29.6, 18.5 + .6)), l.fromRect(2, 1.8, e.create(-30.8, 14.7 + .6)), l.fromRect(2, 1.8, e.create(-28.5, 14.7 + .6)), l.fromRect(5.45, 6, e.create(-29.6, 40.4 + .6)), l.fromRect(2, 1.8, e.create(-30.8, 44.4 + .6)), l.fromRect(2, 1.8, e.create(-28.5, 44.4 + .6)), l.fromRect(6, 15.5, e.create(29.6, 77.7 + .6)), l.fromRect(5.45, 6, e.create(29.6, 66.7 + .6)), l.fromRect(2, 1.8, e.create(30.8, 62.9 + .6)), l.fromRect(2, 1.8, e.create(28.5, 62.8 + .6)), l.fromRect(5.45, 6, e.create(29.6, 88.6 + .6)), l.fromRect(2, 1.8, e.create(30.8, 92.6 + .6)), l.fromRect(2, 1.8, e.create(28.5, 92.6 + .6)), l.fromRect(6, 15.5, e.create(29.6, 29.5 + .6)), l.fromRect(5.45, 6, e.create(29.6, 18.5 + .6)), l.fromRect(2, 1.8, e.create(30.8, 14.7 + .6)), l.fromRect(2, 1.8, e.create(28.5, 14.7 + .6)), l.fromRect(5.45, 6, e.create(29.6, 40.4 + .6)), l.fromRect(2, 1.8, e.create(30.8, 44.4 + .6)), l.fromRect(2, 1.8, e.create(28.5, 44.4 + .6)), l.fromRect(6, 15.5, e.create(-29.6, -82.2 + .6)), l.fromRect(5.45, 6, e.create(-29.6, -71.2 + .6)), l.fromRect(2, 1.8, e.create(-30.8, -67.4 + .6)), l.fromRect(2, 1.8, e.create(-28.5, -67.3 + .6)), l.fromRect(5.45, 6, e.create(-29.6, -93.1 + .6)), l.fromRect(2, 1.8, e.create(-30.8, -97.1 + .6)), l.fromRect(2, 1.8, e.create(-28.5, -97.1 + .6)), l.fromRect(6, 15.5, e.create(-29.6, -34 + .6)), l.fromRect(5.45, 6, e.create(-29.6, -23 + .6)), l.fromRect(2, 1.8, e.create(-30.8, -19.2 + .6)), l.fromRect(2, 1.8, e.create(-28.5, -19.2 + .6)), l.fromRect(5.45, 6, e.create(-29.6, -44.9 + .6)), l.fromRect(2, 1.8, e.create(-30.8, -48.9 + .6)), l.fromRect(2, 1.8, e.create(-28.5, -48.9 + .6)), l.fromRect(6, 15.5, e.create(29.6, -82.2 + .6)), l.fromRect(5.45, 6, e.create(29.6, -71.2 + .6)), l.fromRect(2, 1.8, e.create(30.8, -67.4 + .6)), l.fromRect(2, 1.8, e.create(28.5, -67.3 + .6)), l.fromRect(5.45, 6, e.create(29.6, -93.1 + .6)), l.fromRect(2, 1.8, e.create(30.8, -97.1 + .6)), l.fromRect(2, 1.8, e.create(28.5, -97.1 + .6)), l.fromRect(6, 15.5, e.create(29.6, -34 + .6)), l.fromRect(5.45, 6, e.create(29.6, -23 + .6)), l.fromRect(2, 1.8, e.create(30.8, -19.2 + .6)), l.fromRect(2, 1.8, e.create(28.5, -19.2 + .6)), l.fromRect(5.45, 6, e.create(29.6, -44.9 + .6)), l.fromRect(2, 1.8, e.create(30.8, -48.9 + .6)), l.fromRect(2, 1.8, e.create(28.5, -48.9 + .6)), l.fromRect(4.3, 1.8, e.create(29.6, -99.5)), l.fromRect(4.3, 1.8, e.create(-29.6, -99.5)), l.fromRect(4.3, 1.8, e.create(29.6, 99.5)), l.fromRect(4.3, 1.8, e.create(-29.6, 99.5))),
        rotationMode: 1,
        frames: {
            particle: "metal_particle"
        }
    }, {
        idString: "generator",
        name: "Generator",
        material: "metal",
        health: 200,
        indestructible: !0,
        reflectBullets: !0,
        rotationMode: 1,
        frames: {
            particle: "metal_particle"
        },
        role: H.Activatable,
        sound: {
            name: "generator_starting",
            maxRange: 412,
            falloff: 2
        },
        emitParticles: !0,
        requiredItem: "gas_can",
        interactText: "Activate",
        hitbox: l.fromRect(9, 7)
    }, {
        idString: "ship_thing_1",
        name: "Ship thing 1 lol",
        material: "metal",
        health: 200,
        indestructible: !0,
        rotationMode: 1,
        allowFlyover: 2,
        frames: {
            particle: "metal_particle"
        },
        hitbox: l.fromRect(12, 25)
    }, {
        idString: "ship",
        name: "Ship",
        material: "metal",
        health: 150,
        indestructible: !0,
        reflectBullets: !0,
        invisible: !0,
        rotationMode: 1,
        allowFlyover: 2,
        frames: {
            particle: "metal_particle"
        },
        hitbox: new B(l.fromRect(1, 220, e.create(48, -20)), l.fromRect(1, 66, e.create(-31, 4.8)), l.fromRect(1, 40, e.create(-31, 69)), l.fromRect(1, 90, e.create(-31, -85)), l.fromRect(32.2, 2, e.create(31.7, 81.6)), l.fromRect(33, 2, e.create(-14.8, 81.6)), l.fromRect(80, 1, e.create(8, -128)), l.fromRect(46, 2, e.create(9, -90.2)), l.fromRect(2, 38.6, e.create(-22.8, -70.2)), l.fromRect(2, 24, e.create(-13.1, -79.2)), l.fromRect(2, 9.9, e.create(31.1, -86.3)), l.fromRect(2, 20.2, e.create(31.1, -61)), l.fromRect(10, 2, e.create(36, -82.3)), l.fromRect(2, 32.4, e.create(40.5, -67)), l.fromRect(55, 2, e.create(4.4, -51.8)), l.fromRect(60, 2, e.create(8, 104.5)), l.fromRect(2, 30, e.create(-18, 96)), l.fromRect(2, 30, e.create(35, 96)), new b(12, e.create(8, 118)), ...Array.from({
            length: 2
        }, (a, t) => {
            const i = t === 0 ? 1 : -1,
                o = t === 0 ? 0 : 17;
            return [new b(4, e.create(0 * i + o, 125)), new b(4, e.create(-4 * i + o, 123.5)), new b(4, e.create(-6 * i + o, 122.5)), new b(4, e.create(-8 * i + o, 121)), new b(4, e.create(-10 * i + o, 120)), new b(4, e.create(-12 * i + o, 118.5)), new b(4, e.create(-14 * i + o, 116.5)), new b(4, e.create(-16 * i + o, 114.5)), new b(4, e.create(-18 * i + o, 113)), new b(4, e.create(-20 * i + o, 110.5)), new b(4, e.create(-22 * i + o, 108)), new b(4, e.create(-24 * i + o, 104)), new b(4, e.create(-26 * i + o, 99.5)), new b(4, e.create(-27 * i + o, 95)), new b(4, e.create(-28 * i + o, 91))]
        }).flat())
    }, {
        idString: "oil_tanker_ship",
        name: "Oil Tanker",
        material: "metal",
        health: 150,
        indestructible: !0,
        reflectBullets: !0,
        invisible: !0,
        rotationMode: 1,
        allowFlyover: 2,
        frames: {
            particle: "metal_particle"
        },
        hitbox: new B(l.fromRect(1, 190, e.create(49, -22)), l.fromRect(1, 130, e.create(-32, -51.5)), l.fromRect(1, 30, e.create(-32, 39)), l.fromRect(1, 10, e.create(-32, 69)), l.fromRect(85, 1, e.create(8, -118.5)), l.fromRect(69, 1.5, e.create(3.3, -88.5)), l.fromRect(1.5, 17.5, e.create(37, -96.5)), l.fromRect(1.5, 29, e.create(46.5, -102.5)), l.fromRect(75, 1.5, e.create(9, -117)), l.fromRect(1.5, 29, e.create(-29, -102.5)), l.fromRect(1.5, 13, e.create(-6.2, -95.8)), new b(12, e.create(8, 107)), ...Array.from({
            length: 2
        }, (a, t) => {
            const i = t === 0 ? 1 : -1,
                o = t === 0 ? 0 : 17;
            return [new b(4, e.create(0 * i + o, 114)), new b(4, e.create(-4 * i + o, 112.5)), new b(4, e.create(-6 * i + o, 111.5)), new b(4, e.create(-8 * i + o, 111)), new b(4, e.create(-10 * i + o, 109.8)), new b(4, e.create(-12 * i + o, 108.4)), new b(4, e.create(-14 * i + o, 106.9)), new b(4, e.create(-16 * i + o, 105.2)), new b(4, e.create(-18 * i + o, 103.4)), new b(4, e.create(-20 * i + o, 101.6)), new b(4, e.create(-22 * i + o, 99)), new b(4, e.create(-24 * i + o, 95.3)), new b(4, e.create(-26 * i + o, 92)), new b(4, e.create(-27 * i + o, 89.2)), new b(4, e.create(-28 * i + o, 86.5)), new b(4, e.create(-29 * i + o, 83.8)), new b(4, e.create(-30 * i + o, 80.2)), new b(4, e.create(-30 * i + o, 77))]
        }).flat(), l.fromRect(85, 1.5, e.create(8.6, 73.6)))
    }, {
        idString: "forklift",
        name: "Forklift",
        material: "metal",
        health: 1e3,
        indestructible: !0,
        reflectBullets: !0,
        hitbox: new B(l.fromRect(8.15, 17.3, e.create(0, -3.8)), l.fromRect(9.45, 10.6, e.create(0, -4.9))),
        zIndex: R.ObstaclesLayer1 - 2,
        rotationMode: 1,
        frames: {
            particle: "metal_particle"
        }
    }, {
        idString: "pallet",
        name: "Pallet",
        material: "wood",
        health: 120,
        indestructible: !0,
        hitbox: l.fromRect(0, 0),
        zIndex: R.ObstaclesLayer1 - 1,
        rotationMode: 1,
        allowFlyover: 0,
        frames: {
            particle: "crate_particle"
        },
        noCollisions: !0
    }, {
        idString: "bollard",
        name: "Bollard",
        material: "metal",
        health: 1e3,
        indestructible: !0,
        reflectBullets: !0,
        hitbox: new B(l.fromRect(8.2, 9.2, e.create(-.36, 0)), new b(3.45, e.create(1, 0))),
        rotationMode: 1,
        allowFlyover: 0,
        frames: {
            particle: "metal_particle"
        }
    }, {
        idString: "barrier",
        name: "Barrier",
        material: "metal",
        health: 1e3,
        indestructible: !0,
        reflectBullets: !0,
        hitbox: new B(l.fromRect(1.2, 31.75, e.create(-2.2, -2.8)), l.fromRect(2, 5, e.create(-2.3, 15.4)), l.fromRect(4.71, 6.59, e.create(.95, 15.4))),
        rotationMode: 1,
        frames: {
            particle: "metal_particle"
        }
    }, {
        idString: "port_shed_exterior",
        name: "Port Shed Exterior",
        material: "stone",
        health: 1e3,
        indestructible: !0,
        hideOnMap: !0,
        invisible: !0,
        hitbox: new B(l.fromRect(1.75, 29.5, e.create(-10.23, -1.7)), l.fromRect(1.75, 9.2, e.create(10.23, -11.9)), l.fromRect(1.75, 10.7, e.create(10.23, 7.6)), l.fromRect(20, 1.75, e.create(0, -15.56)), l.fromRect(9, 1.75, e.create(-5.25, 12.19))),
        rotationMode: 1,
        allowFlyover: 2,
        noResidue: !0,
        particleVariations: 2,
        frames: {
            particle: "rock_particle"
        }
    }, {
        idString: "port_fence",
        name: "Port Fence",
        material: "fence",
        health: 40,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .8
        },
        hitbox: l.fromRect(8.45, 1.6),
        rotationMode: 1,
        allowFlyover: 1,
        noResidue: !0,
        frames: {
            particle: "fence_particle"
        }
    }, {
        idString: "port_fence_side",
        name: "Port Fence Side",
        material: "fence",
        health: 40,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .8
        },
        hitbox: new B(l.fromRect(7.75, 1.3, e.create(0, 3.2)), l.fromRect(1.3, 7.75, e.create(3.2, 0))),
        noResidue: !0,
        rotationMode: 1,
        allowFlyover: 2,
        frames: {
            particle: "fence_particle"
        }
    }, {
        idString: "port_warehouse_walls",
        name: "Port warehouse walls",
        material: "metal",
        health: 1e3,
        hideOnMap: !0,
        indestructible: !0,
        reflectBullets: !0,
        hitbox: new B(l.fromRect(2, 18.11, e.create(-31.23, -20.94)), l.fromRect(60, 2.19, e.create(-2.23, -29.12)), l.fromRect(2, 18.35, e.create(27.23, -21.05)), l.fromRect(2, 17.61, e.create(-31.23, 21.44)), l.fromRect(2, 17.81, e.create(27.23, 21.34)), l.fromRect(13.33, 1.86, e.create(20.34, 13.35)), l.fromRect(1.73, 24.52, e.create(-31.36, .38))),
        rotationMode: 1,
        allowFlyover: 2,
        invisible: !0,
        frames: {
            particle: "barrel_particle"
        }
    }, {
        idString: "armory_barracks_walls",
        name: "Armory Barracks Walls",
        material: "stone",
        health: 1e3,
        hideOnMap: !0,
        indestructible: !0,
        hitbox: new B(new l(e.create(23.44, -41), e.create(25.54, -15.1)), new l(e.create(23.44, -4), e.create(25.54, 23.13)), new l(e.create(23.44, 34.23), e.create(25.54, 41)), new l(e.create(-25.51, -42.34), e.create(-1.91, -40.25)), new l(e.create(7, 16.1), e.create(24, 18.2)), new l(e.create(8.18, -42.34), e.create(25.54, -40.25)), new l(e.create(-25.51, -41), e.create(-23.42, 17.54)), new l(e.create(-25.51, 28.57), e.create(-23.42, 42.35)), new l(e.create(-24, 40.25), e.create(-4.33, 42.35)), new l(e.create(5.76, 40.25), e.create(25.54, 42.35)), new l(e.create(4.05, 15.59), e.create(7.06, 18.77)), new l(e.create(-4.12, -21.39), e.create(-1.11, -18.21)), new l(e.create(-24, -20.85), e.create(-4, -18.76))),
        rotationMode: 1,
        allowFlyover: 2,
        invisible: !0,
        particleVariations: 2,
        frames: {
            particle: "rock_particle"
        }
    }, {
        idString: "armory_center_walls",
        name: "Armory Center Walls",
        material: "stone",
        health: 1e3,
        hideOnMap: !0,
        indestructible: !0,
        hitbox: new B(l.fromRect(2.09, 42, e.create(16.38, 0)), l.fromRect(32.34, 2.08, e.create(1.24, -21.87)), l.fromRect(2.09, 3.97, e.create(-13.88, -19.01)), l.fromRect(2.09, 8.27, e.create(-13.88, 16.87)), l.fromRect(2.09, 8.58, e.create(-13.88, -2.64)), l.fromRect(32.34, 2.07, e.create(1.24, 21.88))),
        rotationMode: 1,
        allowFlyover: 2,
        invisible: !0,
        particleVariations: 2,
        frames: {
            particle: "rock_particle"
        }
    }, {
        idString: "armory_vault_walls",
        name: "Armory Vault Walls",
        material: "stone",
        health: 1e3,
        hideOnMap: !0,
        indestructible: !0,
        hitbox: new B(l.fromRect(2.09, 36, e.create(36.03, -2)), l.fromRect(2.09, 11.67, e.create(-13.96, -15.16)), l.fromRect(13.4, 2.09, e.create(30.37, 16.52)), l.fromRect(74.12, 2.09, e.create(.01, -20.98)), l.fromRect(2.09, 11.07, e.create(-13.96, 10.47)), l.fromRect(29, 2.09, e.create(21.9, -6.66)), l.fromRect(2.07, 37, e.create(-36.01, -2.5)), l.fromRect(35.39, 2.09, e.create(-19.35, 16.52)), l.fromRect(4.16, 2.09, e.create(10.5, 16.52))),
        rotationMode: 1,
        allowFlyover: 2,
        invisible: !0,
        particleVariations: 2,
        frames: {
            particle: "rock_particle"
        }
    }, Be(1, "closed"), Be(2, "open1", X.Green), Be(3, "open1", X.Blue), Be(4, "open2", X.Blue), Be(5, "open1", X.Yellow), Be(6, "open2", X.Yellow), {
        idString: "sandbags",
        name: "Sandbags",
        material: "sand",
        health: 1e3,
        indestructible: !0,
        hitbox: l.fromRect(13.1, 7.7),
        rotationMode: 1
    }, {
        idString: "gun_case",
        name: "Gun Case",
        material: "wood",
        health: 100,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .7
        },
        hitbox: l.fromRect(10.22, 4.73),
        rotationMode: 1,
        allowFlyover: 0,
        hasLoot: !0
    }, {
        idString: "m1117",
        name: "M1117",
        material: "metal",
        health: 1e3,
        indestructible: !0,
        reflectBullets: !0,
        hitbox: new B(l.fromRect(18.51, 32.28, e.create(0, -5.17)), l.fromRect(19.69, 6.67, e.create(0, -10.87)), l.fromRect(19.69, 6.67, e.create(0, 10.8)), l.fromRect(17, 5.38, e.create(0, 16.14)), l.fromRect(15.06, 5.38, e.create(0, 19.7))),
        rotationMode: 1,
        allowFlyover: 2,
        frames: {
            particle: "metal_particle"
        }
    }, {
        idString: "cabinet",
        name: "Cabinet",
        material: "appliance",
        health: 100,
        reflectBullets: !0,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .7
        },
        hitbox: l.fromRect(14.53, 4.3, e.create(0, -.22)),
        rotationMode: 1,
        frames: {
            particle: "metal_particle"
        },
        hasLoot: !0
    }, {
        idString: "briefcase",
        name: "Briefcase",
        material: "appliance",
        health: 150,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .7
        },
        hitbox: l.fromRect(10.65, 7.42, e.create(0, .43)),
        rotationMode: 1,
        allowFlyover: 0,
        hasLoot: !0
    }, {
        idString: "button",
        name: "Button",
        material: "stone",
        health: 1e3,
        indestructible: !0,
        role: H.Activatable,
        interactText: "Press",
        sound: {
            name: "button_press"
        },
        hitbox: l.fromRect(2.15, 1.51),
        rotationMode: 1,
        allowFlyover: 0,
        frames: {
            particle: "metal_particle",
            activated: "button_activated"
        }
    }, dt("1", l.fromRect(6.97, 1.68)), dt("2", l.fromRect(10.8, 1.68)), dt("3", l.fromRect(20.43, 1.68)), {
        idString: "mobile_home_bed",
        name: "Mobile Home Bed",
        material: "wood",
        health: 100,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .9
        },
        hideOnMap: !0,
        hitbox: l.fromRect(7.12, 16.06),
        rotationMode: 1,
        allowFlyover: 0,
        frames: {
            particle: "furniture_particle"
        }
    }, {
        idString: "mobile_home_sink",
        name: "Mobile Home Sink",
        material: "wood",
        health: 100,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .7
        },
        hideOnMap: !0,
        hasLoot: !0,
        hitbox: l.fromRect(9.5, 6.63, e.create(0, -.47)),
        rotationMode: 1,
        allowFlyover: 0,
        frames: {
            particle: "furniture_particle"
        }
    }, {
        idString: "mobile_home_stove",
        name: "Mobile Home Stove",
        material: "metal",
        health: 140,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .8
        },
        hideOnMap: !0,
        hitbox: l.fromRect(6.9, 6.64, e.create(0, -.3)),
        rotationMode: 1,
        explosion: "stove_explosion",
        frames: {
            particle: "metal_particle",
            residue: "stove_residue"
        },
        reflectBullets: !0
    }, {
        idString: "mobile_home_tire",
        name: "Mobile Home Tire",
        material: "stone",
        health: 200,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .8
        },
        hitbox: l.fromRect(3.47, 8.35),
        rotationMode: 1,
        noResidue: !0,
        frames: {
            particle: "flint_stone_particle"
        },
        particleVariations: 2
    }, {
        idString: "mobile_home_window",
        name: "Mobile Home Window",
        material: "glass",
        health: 20,
        scale: {
            spawnMin: 1,
            spawnMax: 1,
            destroy: .95
        },
        hideOnMap: !0,
        hitbox: l.fromRect(13.8, 1.5),
        zIndex: R.ObstaclesLayer2,
        allowFlyover: 2,
        rotationMode: 1,
        role: H.Window,
        noCollisionAfterDestroyed: !0,
        frames: {
            particle: "window_particle"
        }
    }]),
    Ce = a => Math.ceil(Math.log2(Object.keys(a).length / 2)),
    bt = Ce(Z),
    Kt = Ce(D),
    Jt = 13,
    Yt = 3,
    Xt = .25,
    Qt = 3;
class ct extends Ii.BitStream {
    constructor(t, i = 0, o = 0) {
        super(t, i, o)
    }
    static alloc(t) {
        return new ct(new ArrayBuffer(t))
    }
    writeFloat(t, i, o, r) {
        const n = (1 << r) - 1,
            c = E.clamp(t, i, o);
        this.writeBits((c - i) / (o - i) * n + .5, r)
    }
    readFloat(t, i, o) {
        const r = (1 << o) - 1;
        return t + (i - t) * this.readBits(o) / r
    }
    writeVector(t, i, o, r, n, c) {
        this.writeVector2(t.x, t.y, i, o, r, n, c)
    }
    writeVector2(t, i, o, r, n, c, h) {
        this.writeFloat(t, o, n, h), this.writeFloat(i, r, c, h)
    }
    readVector(t, i, o, r, n) {
        return {
            x: this.readFloat(t, o, n),
            y: this.readFloat(i, r, n)
        }
    }
    writePacketType(t) {
        this.writeBits(t, bt)
    }
    readPacketType() {
        return this.readBits(bt)
    }
    writeObjectType(t) {
        this.writeBits(t, Kt)
    }
    readObjectType() {
        return this.readBits(Kt)
    }
    writeObjectID(t) {
        this.writeBits(t, Jt)
    }
    readObjectID() {
        return this.readBits(Jt)
    }
    writePosition(t) {
        this.writePosition2(t.x, t.y)
    }
    writePosition2(t, i) {
        this.writeVector2(t, i, 0, 0, C.maxPosition, C.maxPosition, 16)
    }
    readPosition() {
        return this.readVector(0, 0, C.maxPosition, C.maxPosition, 16)
    }
    writeRotation(t, i) {
        this.writeFloat(t, -Math.PI, Math.PI, i)
    }
    readRotation(t) {
        return this.readFloat(-Math.PI, Math.PI, t)
    }
    writeObstacleRotation(t, i) {
        switch (i) {
            case te.Full:
                this.writeRotation(t, 4);
                break;
            case te.Limited:
                this.writeBits(t, 2);
                break;
            case te.Binary:
                this.writeBits(t, 1);
                break
        }
    }
    readObstacleRotation(t) {
        let i = 0,
            o = 0;
        switch (t) {
            case te.Full:
                o = this.readRotation(4);
                break;
            case te.Limited:
                i = this.readBits(2), o = -ze.normalize(i) * (Math.PI / 2);
                break;
            case te.Binary:
                this.readBoolean() && (o = Math.PI / 2, i = 1);
                break
        }
        return {
            rotation: o,
            orientation: i
        }
    }
    writeScale(t) {
        this.writeFloat(t, Xt, Qt, 8)
    }
    readScale() {
        return this.readFloat(Xt, Qt, 8)
    }
    writeVariation(t) {
        this.writeBits(t, Yt)
    }
    readVariation() {
        return this.readBits(Yt)
    }
    writePlayerName(t) {
        this.writeASCIIString(t, C.player.nameMaxLength)
    }
    readPlayerName() {
        return this.readASCIIString(C.player.nameMaxLength)
    }
}
class ye {
    constructor() {
        s(this, "stream")
    }
    serialize() {
        this.stream = ct.alloc(this.allocBytes), this.stream.writePacketType(this.type)
    }
    getBuffer() {
        return this.stream.buffer.slice(0, Math.ceil(this.stream.index / 8))
    }
}
class Zi extends ye {
    constructor() {
        super(...arguments);
        s(this, "allocBytes", 64);
        s(this, "type", Z.GameOver);
        s(this, "won");
        s(this, "playerID");
        s(this, "kills");
        s(this, "damageDone");
        s(this, "damageTaken");
        s(this, "timeAlive");
        s(this, "rank")
    }
    serialize() {
        super.serialize();
        const i = this.stream;
        i.writeBoolean(this.won), i.writeObjectID(this.playerID), i.writeUint8(this.kills), i.writeUint16(this.damageDone), i.writeUint16(this.damageTaken), i.writeUint16(this.timeAlive), this.won || i.writeBits(this.rank, 7)
    }
    deserialize(i) {
        this.won = i.readBoolean(), this.playerID = i.readObjectID(), this.kills = i.readUint8(), this.damageDone = i.readUint16(), this.damageTaken = i.readUint16(), this.timeAlive = i.readUint16(), this.rank = this.won ? 1 : i.readBits(7)
    }
}
class Ki extends ye {
    constructor() {
        super(...arguments);
        s(this, "allocBytes", 34);
        s(this, "type", Z.Joined);
        s(this, "protocolVersion");
        s(this, "emotes", [])
    }
    serialize() {
        super.serialize();
        const i = this.stream;
        i.writeUint16(C.protocolVersion);
        for (const o of this.emotes) Pe.writeToStream(i, o)
    }
    deserialize(i) {
        this.protocolVersion = i.readUint16();
        for (let o = 0; o < 4; o++) this.emotes.push(Pe.readFromStream(i))
    }
}
class Ji extends ye {
    constructor() {
        super(...arguments);
        s(this, "allocBytes", 24);
        s(this, "type", Z.Join);
        s(this, "name");
        s(this, "isMobile");
        s(this, "skin");
        s(this, "emotes", [])
    }
    serialize() {
        super.serialize();
        const i = this.stream;
        i.writePlayerName(this.name), i.writeBoolean(this.isMobile), W.writeToStream(i, this.skin);
        for (const o of this.emotes) Pe.writeToStream(i, o)
    }
    deserialize(i) {
        this.name = i.readPlayerName().replaceAll(/<[^>]+>/g, "").trim(), this.isMobile = i.readBoolean(), this.skin = W.readFromStream(i);
        for (let o = 0; o < 4; o++) this.emotes.push(Pe.readFromStream(i))
    }
}
class Yi extends ye {
    constructor() {
        super(...arguments);
        s(this, "allocBytes", 65536);
        s(this, "type", Z.Map);
        s(this, "seed");
        s(this, "width");
        s(this, "height");
        s(this, "oceanSize");
        s(this, "beachSize");
        s(this, "_rivers", []);
        s(this, "_objects", []);
        s(this, "_places", [])
    }
    get rivers() {
        return this._rivers
    }
    get objects() {
        return this._objects
    }
    get places() {
        return this._places
    }
    serialize() {
        super.serialize();
        const i = this.stream;
        i.writeUint32(this.seed), i.writeUint16(this.width), i.writeUint16(this.height), i.writeUint16(this.oceanSize), i.writeUint16(this.beachSize), i.writeBits(this._rivers.length, 4);
        for (const o of this._rivers) {
            i.writeUint8(o.width), i.writeUint8(o.points.length);
            for (const r of o.points) i.writePosition(r)
        }
        i.writeUint16(this._objects.length);
        for (const o of this._objects) switch (i.writeObjectType(o.type), i.writePosition(o.position), o.type) {
            case D.Obstacle: {
                nt.writeToStream(i, o.definition), i.writeObstacleRotation(o.rotation, o.definition.rotationMode), o.definition.variations !== void 0 && o.variation !== void 0 && i.writeVariation(o.variation);
                break
            }
            case D.Building:
                rt.writeToStream(i, o.definition), i.writeObstacleRotation(o.rotation, te.Limited);
                break
        }
        i.writeBits(this._places.length, 4);
        for (const o of this._places) i.writeASCIIString(o.name, 24), i.writePosition(o.position)
    }
    deserialize(i) {
        this.seed = i.readUint32(), this.width = i.readUint16(), this.height = i.readUint16(), this.oceanSize = i.readUint16(), this.beachSize = i.readUint16(), this._rivers = Array.from({
            length: i.readBits(4)
        }, () => ({
            width: i.readUint8(),
            points: Array.from({
                length: i.readUint8()
            }, () => i.readPosition())
        })), this._objects = Array.from({
            length: i.readUint16()
        }, () => {
            var n;
            const o = i.readObjectType(),
                r = i.readPosition();
            switch (o) {
                case D.Obstacle: {
                    const c = nt.readFromStream(i),
                        h = ((n = c.scale) == null ? void 0 : n.spawnMax) ?? 1,
                        g = i.readObstacleRotation(c.rotationMode).rotation;
                    let u;
                    return c.variations !== void 0 && (u = i.readVariation()), {
                        position: r,
                        type: o,
                        definition: c,
                        scale: h,
                        rotation: g,
                        variation: u
                    }
                }
                case D.Building: {
                    const c = rt.readFromStream(i),
                        {
                            orientation: h
                        } = i.readObstacleRotation(te.Limited);
                    return {
                        position: r,
                        type: o,
                        definition: c,
                        rotation: h,
                        scale: 1
                    }
                }
            }
        }), this._places = Array.from({
            length: i.readBits(4)
        }, () => ({
            name: i.readASCIIString(24),
            position: i.readPosition()
        }))
    }
}
class Xi extends ye {
    constructor() {
        super(...arguments);
        s(this, "allocBytes", 2);
        s(this, "type", Z.Pickup);
        s(this, "item")
    }
    serialize() {
        super.serialize(), W.writeToStream(this.stream, this.item)
    }
    deserialize(i) {
        this.item = W.readFromStream(i)
    }
}
class ei extends ye {
    constructor() {
        super(...arguments);
        s(this, "allocBytes", bt);
        s(this, "type", Z.Ping)
    }
    deserialize(i) {}
}
class Qi extends ye {
    constructor() {
        super(...arguments);
        s(this, "allocBytes", 25);
        s(this, "type", Z.Report);
        s(this, "playerName");
        s(this, "reportID")
    }
    serialize() {
        super.serialize(), this.stream.writePlayerName(this.playerName), this.stream.writeASCIIString(this.reportID, 8)
    }
    deserialize(i) {
        this.playerName = i.readPlayerName(), this.reportID = i.readASCIIString(8)
    }
}
const Ze = new ae([{
        idString: "barrel_explosion",
        name: "Barrel",
        damage: 130,
        obstacleMultiplier: 1,
        radius: {
            min: 8,
            max: 25
        },
        cameraShake: {
            duration: 250,
            intensity: 50
        },
        animation: {
            duration: 1e3,
            tint: 9507851,
            scale: 1.5
        },
        shrapnelCount: 10,
        ballistics: {
            damage: 2,
            obstacleMultiplier: 1,
            speed: .08,
            range: 20,
            rangeVariance: 1,
            shrapnel: !0
        }
    }, {
        idString: "stove_explosion",
        name: "Stove",
        damage: 130,
        obstacleMultiplier: 2,
        radius: {
            min: 8,
            max: 25
        },
        cameraShake: {
            duration: 250,
            intensity: 50
        },
        animation: {
            duration: 1e3,
            tint: 16733440,
            scale: 1.5
        },
        shrapnelCount: 10,
        ballistics: {
            damage: 10,
            obstacleMultiplier: 1,
            speed: .08,
            range: 20,
            rangeVariance: 1,
            shrapnel: !0
        }
    }, {
        idString: "control_panel_explosion",
        name: "Control Panel",
        damage: 130,
        obstacleMultiplier: 1.5,
        radius: {
            min: 8,
            max: 25
        },
        cameraShake: {
            duration: 250,
            intensity: 50
        },
        animation: {
            duration: 1e3,
            tint: 16733440,
            scale: 1.5
        },
        shrapnelCount: 10,
        ballistics: {
            damage: 10,
            obstacleMultiplier: 1,
            speed: .08,
            range: 20,
            rangeVariance: 1,
            shrapnel: !0
        }
    }, {
        idString: "super_barrel_explosion",
        name: "Super Barrel",
        damage: 160,
        obstacleMultiplier: 1,
        radius: {
            min: 8,
            max: 25
        },
        cameraShake: {
            duration: 500,
            intensity: 100
        },
        animation: {
            duration: 1500,
            tint: 16711680,
            scale: 2.5
        },
        shrapnelCount: 20,
        ballistics: {
            damage: 4,
            obstacleMultiplier: 2,
            speed: .08,
            range: 30,
            rangeVariance: 1,
            shrapnel: !0
        }
    }, {
        idString: "small_refinery_barrel_explosion",
        name: "Small Refinery Barrel",
        damage: 200,
        obstacleMultiplier: 2,
        radius: {
            min: 16,
            max: 40
        },
        cameraShake: {
            duration: 750,
            intensity: 100
        },
        animation: {
            duration: 1500,
            tint: 9507851,
            scale: 2.5
        },
        shrapnelCount: 25,
        ballistics: {
            damage: 12,
            obstacleMultiplier: 2,
            speed: .08,
            range: 30,
            rangeVariance: 1,
            shrapnel: !0
        }
    }, {
        idString: "large_refinery_barrel_explosion",
        name: "Large Refinery Barrel",
        damage: 1e4,
        obstacleMultiplier: 3,
        radius: {
            min: 48,
            max: 58
        },
        cameraShake: {
            duration: 2e3,
            intensity: 100
        },
        animation: {
            duration: 1500,
            tint: 16711680,
            scale: 5
        },
        shrapnelCount: 50,
        ballistics: {
            damage: 15,
            obstacleMultiplier: 3,
            speed: .08,
            range: 60,
            rangeVariance: 1,
            shrapnel: !0
        }
    }, {
        idString: "usas_explosion",
        name: "USAS-12",
        damage: 35,
        obstacleMultiplier: 1,
        radius: {
            min: 6,
            max: 16
        },
        cameraShake: {
            duration: 100,
            intensity: 10
        },
        animation: {
            duration: 1500,
            tint: 7082771,
            scale: .8
        },
        shrapnelCount: 13,
        ballistics: {
            damage: 3,
            obstacleMultiplier: 1.5,
            speed: .06,
            range: 10,
            rangeVariance: 1,
            shrapnel: !0
        },
        sound: "usas_explosion",
        decal: "explosion_decal"
    }, {
        idString: "frag_explosion",
        name: "Frag Grenade",
        damage: 120,
        obstacleMultiplier: 1.15,
        radius: {
            min: 10,
            max: 25
        },
        cameraShake: {
            duration: 200,
            intensity: 30
        },
        animation: {
            duration: 1e3,
            tint: 9507851,
            scale: 1.5
        },
        shrapnelCount: 10,
        ballistics: {
            damage: 15,
            obstacleMultiplier: 1,
            speed: .08,
            range: 20,
            rangeVariance: 1,
            shrapnel: !0
        },
        sound: "frag_grenade",
        decal: "frag_explosion_decal"
    }, {
        idString: "smoke_explosion",
        name: "Smoke grenade",
        damage: 0,
        obstacleMultiplier: 0,
        radius: {
            min: 0,
            max: 0
        },
        cameraShake: {
            duration: 0,
            intensity: 0
        },
        animation: {
            duration: 500,
            tint: 9075835,
            scale: .5
        },
        shrapnelCount: 0,
        ballistics: {
            damage: 0,
            obstacleMultiplier: 0,
            speed: 0,
            range: 0,
            shrapnel: !1
        },
        sound: "smoke_grenade",
        decal: "smoke_explosion_decal"
    }]),
    ut = {
        "9mm": 16777088,
        "12g": 16763080,
        "556mm": 8454016,
        "762mm": 8454143,
        "127mm": 4227072,
        shrapnel: 1907997
    },
    pt = new ae([...Dt, ...Ze.definitions].filter(a => !("isDual" in a) || !a.isDual).map(a => {
        var i;
        let t = (i = a.ballistics.tracer) == null ? void 0 : i.color;
        return t || ("ammoType" in a && a.ammoType in ut ? t = ut[a.ammoType] : a.ballistics.shrapnel && (t = ut.shrapnel)), {
            idString: `${a.idString}_bullet`,
            name: `${a.name} Bullet`,
            ...a.ballistics,
            tracer: {
                color: t,
                ...a.ballistics.tracer ?? {}
            }
        }
    }));
class bi {
    constructor(t) {
        s(this, "position");
        s(this, "initialPosition");
        s(this, "rotation");
        s(this, "velocity");
        s(this, "direction");
        s(this, "maxDistance");
        s(this, "maxDistanceSquared");
        s(this, "reflectionCount");
        s(this, "sourceID");
        s(this, "damagedIDs", new Set);
        s(this, "rangeVariance");
        s(this, "dead", !1);
        s(this, "definition");
        s(this, "canHitShooter");
        this.initialPosition = e.clone(t.position), this.position = t.position, this.rotation = t.rotation, this.reflectionCount = t.reflectionCount ?? 0, this.sourceID = t.sourceID, this.rangeVariance = t.variance ?? 0, this.definition = pt.reify(t.source);
        let i = this.definition.range;
        this.definition.goToMouse && t.clipDistance !== void 0 && (i = E.clamp(t.clipDistance, 0, this.definition.range)), this.maxDistance = i * (this.rangeVariance + 1) / (this.reflectionCount + 1), this.maxDistanceSquared = this.maxDistance ** 2, this.direction = e.create(Math.sin(this.rotation), -Math.cos(this.rotation)), this.velocity = e.scale(this.direction, this.definition.speed * (this.rangeVariance + 1)), this.canHitShooter = this.definition.shrapnel ?? this.reflectionCount > 0
    }
    updateAndGetCollisions(t, i) {
        var n;
        const o = e.clone(this.position);
        if (this.position = e.add(this.position, e.scale(this.velocity, t)), Me.distanceSquared(this.initialPosition, this.position) > this.maxDistanceSquared && (this.dead = !0, this.position = e.add(this.initialPosition, e.scale(this.direction, this.maxDistance))), this.definition.noCollision) return [];
        const r = [];
        for (const c of i)
            if (!(c.type === D.Obstacle && c.definition.noBulletCollision) && c.damageable && !c.dead && !(!this.canHitShooter && c.id === this.sourceID) && !this.damagedIDs.has(c.id)) {
                const h = (n = c.hitbox) == null ? void 0 : n.intersectsLine(o, this.position);
                h && r.push({
                    intersection: h,
                    object: c
                })
            } return r.sort((c, h) => {
            var g, u;
            return Me.distanceSquared((g = c.intersection) == null ? void 0 : g.point, this.initialPosition) - Me.distanceSquared((u = h.intersection) == null ? void 0 : u.point, this.initialPosition)
        }), r
    }
    serialize(t) {
        pt.writeToStream(t, this.definition), t.writePosition(this.initialPosition), t.writeRotation(this.rotation, 16), t.writeFloat(this.rangeVariance, 0, 1, 4), t.writeBits(this.reflectionCount, 2), t.writeObjectID(this.sourceID), this.definition.goToMouse && t.writeFloat(this.maxDistance, 0, this.definition.range, 16)
    }
    static deserialize(t) {
        const i = pt.readFromStream(t),
            o = t.readPosition(),
            r = t.readRotation(16),
            n = t.readFloat(0, 1, 4),
            c = t.readBits(2),
            h = t.readObjectID(),
            g = i.goToMouse ? t.readFloat(0, i.range, 16) : void 0;
        return {
            source: i,
            position: o,
            rotation: r,
            variance: n,
            reflectionCount: c,
            sourceID: h,
            clipDistance: g
        }
    }
}
const ti = new ae([{
    idString: "explosion_decal",
    name: "Explosion Decal",
    rotationMode: te.Full
}, {
    idString: "frag_explosion_decal",
    name: "Frag Explosion Decal",
    rotationMode: te.Full
}, {
    idString: "smoke_explosion_decal",
    name: "Smoke Explosion Decal",
    rotationMode: te.Full
}, {
    idString: "floor_oil_01",
    name: "Floor Oil 1"
}, {
    idString: "floor_oil_02",
    name: "Floor Oil 2"
}, {
    idString: "floor_oil_03",
    name: "Floor Oil 3"
}, {
    idString: "floor_oil_04",
    name: "Floor Oil 4"
}, {
    idString: "floor_oil_05",
    name: "Floor Oil 5"
}, {
    idString: "floor_oil_06",
    name: "Floor Oil 6"
}, {
    idString: "floor_oil_07",
    name: "Floor Oil 7"
}, {
    idString: "container_mark",
    name: "Container mark",
    zIndex: R.BuildingsFloor
}]);

function gt(a, t, i) {
    return {
        idString: a,
        name: t,
        scale: {
            start: {
                min: 1.5,
                max: 2
            },
            end: {
                min: 1.75,
                max: 2.25
            }
        },
        alpha: {
            start: 1,
            end: 0,
            easing: "expoIn"
        },
        angularVelocity: {
            min: -5e-4,
            max: 5e-4
        },
        velocity: {
            min: {
                x: -2e-4,
                y: -2e-4
            },
            max: {
                x: 2e-4,
                y: 2e-4
            }
        },
        lifetime: {
            mean: 2e4,
            deviation: 1e3
        },
        zIndex: R.ObstaclesLayer4,
        frame: "smoke_grenade_particle",
        ...i
    }
}
const ii = new ae([gt("smoke_grenade_particle", "Smoke Grenade Particle"), gt("tear_gas_particle", "Tear Gas Particle", {
        tint: 10544895,
        hitbox: new b(11),
        depletePerTick: {
            adrenaline: .0055
        }
    }), gt("airdrop_smoke_particle", "Airdrop Smoke Particle", {
        velocity: {
            min: {
                x: -.002,
                y: -.002
            },
            max: {
                x: .002,
                y: .002
            }
        },
        lifetime: {
            mean: 2e3,
            deviation: 500
        }
    })]),
    ai = Ce(ce),
    oi = Ce(De),
    Qe = {
        [D.Player]: {
            serializePartial(a, t) {
                a.writePosition(t.position), a.writeRotation(t.rotation, 16);
                const i = t.animation !== void 0;
                a.writeBoolean(i), i && a.writeBits(t.animation, ai);
                const o = t.action,
                    r = o !== void 0;
                a.writeBoolean(r), r && (a.writeBits(o.type, oi), o.item && W.writeToStream(a, o.item))
            },
            serializeFull(a, t) {
                this.serializePartial(a, t);
                const i = t.full;
                a.writeBoolean(i.dead), a.writeBoolean(i.invulnerable), W.writeToStream(a, i.activeItem), ot.writeToStream(a, i.skin), St.writeToStream(a, i.backpack), a.writeBoolean(i.helmet !== void 0), i.helmet && Ne.writeToStream(a, i.helmet), a.writeBoolean(i.vest !== void 0), i.vest && Ne.writeToStream(a, i.vest)
            },
            deserializePartial(a) {
                const t = {
                    position: a.readPosition(),
                    rotation: a.readRotation(16),
                    animation: a.readBoolean() ? a.readBits(ai) : void 0
                };
                if (a.readBoolean()) {
                    const i = {
                        type: a.readBits(oi),
                        item: void 0
                    };
                    i.type === De.UseItem && (i.item = W.readFromStream(a)), t.action = i
                }
                return t
            },
            deserializeFull(a) {
                const t = this.deserializePartial(a),
                    i = {
                        dead: a.readBoolean(),
                        invulnerable: a.readBoolean(),
                        activeItem: W.readFromStream(a),
                        skin: ot.readFromStream(a),
                        backpack: St.readFromStream(a)
                    };
                return a.readBoolean() && (i.helmet = Ne.readFromStream(a)), a.readBoolean() && (i.vest = Ne.readFromStream(a)), {
                    ...t,
                    full: i
                }
            }
        },
        [D.Obstacle]: {
            serializePartial(a, t) {
                a.writeScale(t.scale), a.writeBoolean(t.dead)
            },
            serializeFull(a, t) {
                this.serializePartial(a, t);
                const i = t.full;
                nt.writeToStream(a, i.definition), a.writePosition(i.position), a.writeObstacleRotation(i.rotation.rotation, i.definition.rotationMode), i.definition.variations !== void 0 && i.variation !== void 0 && a.writeVariation(i.variation), i.definition.role === H.Door && i.door ? a.writeBits(i.door.offset, 2) : i.definition.role === H.Activatable && a.writeBoolean(i.activated ?? !1)
            },
            deserializePartial(a) {
                return {
                    scale: a.readScale(),
                    dead: a.readBoolean()
                }
            },
            deserializeFull(a) {
                const t = this.deserializePartial(a),
                    i = nt.readFromStream(a),
                    o = {
                        definition: i,
                        position: a.readPosition(),
                        rotation: a.readObstacleRotation(i.rotationMode),
                        variation: i.variations ? a.readVariation() : void 0
                    };
                return i.role === H.Door ? o.door = {
                    offset: a.readBits(2)
                } : i.role === H.Activatable && (o.activated = a.readBoolean()), {
                    ...t,
                    full: o
                }
            }
        },
        [D.Loot]: {
            serializePartial(a, t) {
                a.writePosition(t.position)
            },
            serializeFull(a, t) {
                this.serializePartial(a, t), W.writeToStream(a, t.full.definition), a.writeBits(t.full.count, 9), a.writeBoolean(t.full.isNew)
            },
            deserializePartial(a) {
                return {
                    position: a.readPosition()
                }
            },
            deserializeFull(a) {
                return {
                    ...this.deserializePartial(a),
                    full: {
                        definition: W.readFromStream(a),
                        count: a.readBits(9),
                        isNew: a.readBoolean()
                    }
                }
            }
        },
        [D.DeathMarker]: {
            serializePartial(a, t) {
                a.writePosition(t.position), a.writeBoolean(t.isNew), a.writeObjectID(t.playerID)
            },
            serializeFull(a, t) {
                this.serializePartial(a, t)
            },
            deserializePartial(a) {
                const t = a.readPosition(),
                    i = a.readBoolean(),
                    o = a.readObjectID();
                return {
                    position: t,
                    isNew: i,
                    playerID: o
                }
            },
            deserializeFull(a) {
                return this.deserializePartial(a)
            }
        },
        [D.Building]: {
            serializePartial(a, t) {
                a.writeBoolean(t.dead), a.writeBoolean(!!t.puzzle), t.puzzle && (a.writeBoolean(t.puzzle.solved), a.writeBoolean(t.puzzle.errorSeq))
            },
            serializeFull(a, t) {
                this.serializePartial(a, t), rt.writeToStream(a, t.full.definition), a.writePosition(t.full.position), a.writeBits(t.full.rotation, 2)
            },
            deserializePartial(a) {
                return {
                    dead: a.readBoolean(),
                    puzzle: a.readBoolean() ? {
                        solved: a.readBoolean(),
                        errorSeq: a.readBoolean()
                    } : void 0
                }
            },
            deserializeFull(a) {
                return {
                    ...this.deserializePartial(a),
                    full: {
                        definition: rt.readFromStream(a),
                        position: a.readPosition(),
                        rotation: a.readBits(2)
                    }
                }
            }
        },
        [D.Decal]: {
            serializePartial(a, t) {
                ti.writeToStream(a, t.definition), a.writePosition(t.position), a.writeObstacleRotation(t.rotation, t.definition.rotationMode ?? te.Limited)
            },
            serializeFull(a, t) {
                this.serializePartial(a, t)
            },
            deserializePartial(a) {
                const t = ti.readFromStream(a);
                return {
                    definition: t,
                    position: a.readPosition(),
                    rotation: a.readObstacleRotation(t.rotationMode ?? te.Limited).rotation
                }
            },
            deserializeFull(a) {
                return this.deserializePartial(a)
            }
        },
        [D.Parachute]: {
            serializePartial(a, t) {
                a.writeFloat(t.height, 0, 1, 8)
            },
            serializeFull(a, t) {
                this.serializePartial(a, t), a.writePosition(t.full.position)
            },
            deserializePartial(a) {
                return {
                    height: a.readFloat(0, 1, 8)
                }
            },
            deserializeFull(a) {
                return {
                    ...this.deserializePartial(a),
                    full: {
                        position: a.readPosition()
                    }
                }
            }
        },
        [D.ThrowableProjectile]: {
            serializePartial(a, t) {
                a.writePosition(t.position), a.writeRotation(t.rotation, 16), a.writeBoolean(t.airborne)
            },
            serializeFull(a, t) {
                this.serializePartial(a, t), W.writeToStream(a, t.full.definition)
            },
            deserializePartial(a) {
                return {
                    position: a.readPosition(),
                    rotation: a.readRotation(16),
                    airborne: a.readBoolean()
                }
            },
            deserializeFull(a) {
                return {
                    ...this.deserializePartial(a),
                    full: {
                        definition: W.readFromStream(a)
                    }
                }
            }
        },
        [D.SyncedParticle]: {
            serializePartial(a, t) {
                a.writePosition(t.position), a.writeRotation(t.rotation, 8);
                const i = t.scale !== void 0;
                a.writeBoolean(i), i && a.writeScale(t.scale);
                const o = t.alpha !== void 0;
                a.writeBoolean(o), o && a.writeFloat(t.alpha, 0, 1, 8)
            },
            serializeFull(a, t) {
                this.serializePartial(a, t);
                const i = t.full;
                ii.writeToStream(a, i.definition);
                const o = i.variant;
                a.writeBoolean(o !== void 0), o !== void 0 && a.writeVariation(o)
            },
            deserializePartial(a) {
                const t = {
                    position: a.readPosition(),
                    rotation: a.readRotation(8)
                };
                return a.readBoolean() && (t.scale = a.readScale()), a.readBoolean() && (t.alpha = a.readFloat(0, 1, 8)), t
            },
            deserializeFull(a) {
                return {
                    ...this.deserializePartial(a),
                    full: {
                        definition: ii.readFromStream(a),
                        variant: a.readBoolean() ? a.readVariation() : void 0
                    }
                }
            }
        }
    };

function ea(a, t) {
    const i = t.dirty;
    a.writeBoolean(i.maxMinStats), i.maxMinStats && (a.writeFloat32(t.maxHealth), a.writeFloat32(t.minAdrenaline), a.writeFloat32(t.maxAdrenaline)), a.writeBoolean(i.health), i.health && a.writeFloat(t.health, 0, t.maxHealth, 12), a.writeBoolean(i.adrenaline), i.adrenaline && a.writeFloat(t.adrenaline, t.minAdrenaline, t.maxAdrenaline, 12), a.writeBoolean(i.zoom), i.zoom && a.writeUint8(t.zoom), a.writeBoolean(i.id), i.id && (a.writeObjectID(t.id), a.writeBoolean(t.spectating));
    const o = t.inventory;
    if (a.writeBoolean(i.weapons), i.weapons) {
        a.writeBits(o.activeWeaponIndex, 2);
        for (const r of o.weapons ?? [])
            if (a.writeBoolean(r !== void 0), r !== void 0) {
                W.writeToStream(a, r.definition);
                const n = r.count !== void 0;
                a.writeBoolean(n), n && a.writeUint8(r.count), r.definition.killstreak !== void 0 && a.writeBits(r.stats.kills, 7)
            }
    }
    if (a.writeBoolean(i.items), i.items) {
        for (const r in Je) {
            const n = o.items[r];
            a.writeBoolean(n > 0), n > 0 && a.writeBits(n, 9)
        }
        me.writeToStream(a, o.scope)
    }
}

function ta(a, t) {
    const i = {},
        o = {},
        r = {
            dirty: i,
            inventory: o
        };
    if ((i.maxMinStats = a.readBoolean()) && (r.maxHealth = a.readFloat32(), r.minAdrenaline = a.readFloat32(), r.maxAdrenaline = a.readFloat32()), (i.health = a.readBoolean()) && (r.health = a.readFloat(0, r.maxHealth ?? t.maxHealth, 12)), (i.adrenaline = a.readBoolean()) && (r.adrenaline = a.readFloat(r.minAdrenaline ?? t.minAdrenaline, r.maxAdrenaline ?? t.maxAdrenaline, 12)), (i.zoom = a.readBoolean()) && (r.zoom = a.readUint8()), (i.id = a.readBoolean()) && (r.id = a.readObjectID(), r.spectating = a.readBoolean()), i.weapons = a.readBoolean()) {
        o.activeWeaponIndex = a.readBits(2);
        const n = C.player.maxWeapons;
        o.weapons = Array.from({
            length: n
        }, () => {});
        for (let c = 0; c < n; c++)
            if (a.readBoolean()) {
                const h = W.readFromStream(a);
                o.weapons[c] = {
                    definition: h,
                    count: a.readBoolean() ? a.readUint8() : void 0,
                    stats: {
                        kills: h.killstreak ? a.readBits(7) : void 0
                    }
                }
            }
    }
    if (i.items = a.readBoolean()) {
        o.items = {};
        for (const n in Je) o.items[n] = a.readBoolean() ? a.readBits(9) : 0;
        o.scope = me.readFromStream(a)
    }
    return r
}
const xi = Ce(ie),
    vi = Ce(re);

function ia(a, t) {
    switch (a.writeBits(t.messageType, xi), t.messageType) {
        case ie.Kill: {
            a.writeObjectID(t.playerID), a.writeBits(t.killType ?? re.Suicide, vi), t.killType === re.TwoPartyInteraction && (a.writeObjectID(t.killerID), a.writeBits(t.kills, 7));
            const i = t.weaponUsed !== void 0;
            if (a.writeBoolean(i), i) {
                const o = "shrapnelCount" in t.weaponUsed;
                a.writeBoolean(o), o ? Ze.writeToStream(a, t.weaponUsed) : W.writeToStream(a, t.weaponUsed), t.weaponUsed !== void 0 && "killstreak" in t.weaponUsed && t.weaponUsed.killstreak && a.writeBits(t.killstreak, 7), "dual" in t.weaponUsed && a.writeBoolean(t.dual)
            }
            break
        }
        case ie.KillLeaderAssigned: {
            a.writeObjectID(t.playerID), a.writeBits(t.kills, 7), a.writeBoolean(t.hideInKillfeed ?? !1);
            break
        }
        case ie.KillLeaderUpdated: {
            a.writeBits(t.kills, 7);
            break
        }
        case ie.KillLeaderDead: {
            a.writeObjectID(t.playerID), a.writeObjectID(t.killerID);
            break
        }
    }
}

function aa(a) {
    const t = {
        messageType: a.readBits(xi)
    };
    switch (t.messageType) {
        case ie.Kill: {
            t.playerID = a.readObjectID(), t.killType = a.readBits(vi), t.killType === re.TwoPartyInteraction && (t.killerID = a.readObjectID(), t.kills = a.readBits(7)), a.readBoolean() && (t.weaponUsed = a.readBoolean() ? Ze.readFromStream(a) : W.readFromStream(a), t.weaponUsed !== void 0 && "killstreak" in t.weaponUsed && t.weaponUsed.killstreak && (t.killstreak = a.readBits(7)), "dual" in t.weaponUsed && (t.dual = a.readBoolean()));
            break
        }
        case ie.KillLeaderAssigned: {
            t.playerID = a.readObjectID(), t.kills = a.readBits(7), t.hideInKillfeed = a.readBoolean();
            break
        }
        case ie.KillLeaderUpdated: {
            t.kills = a.readBits(7);
            break
        }
        case ie.KillLeaderDead: {
            t.playerID = a.readObjectID(), t.killerID = a.readObjectID();
            break
        }
    }
    return t
}
const P = Object.freeze({
        PlayerData: 1,
        DeletedObjects: 2,
        FullObjects: 4,
        PartialObjects: 8,
        Bullets: 16,
        Explosions: 32,
        Emotes: 64,
        Gas: 128,
        GasPercentage: 256,
        NewPlayers: 512,
        DeletedPlayers: 1024,
        AliveCount: 2048,
        KillFeedMessages: 4096,
        Planes: 8192,
        MapPings: 16384
    }),
    ri = Object.keys(P).length;
class oa extends ye {
    constructor() {
        super(...arguments);
        s(this, "allocBytes", 65536);
        s(this, "type", Z.Update);
        s(this, "playerData");
        s(this, "previousData");
        s(this, "deletedObjects", new Set);
        s(this, "fullDirtyObjects", new Set);
        s(this, "partialDirtyObjects", new Set);
        s(this, "bullets", new Set);
        s(this, "deserializedBullets", new Set);
        s(this, "explosions", new Set);
        s(this, "emotes", new Set);
        s(this, "gas");
        s(this, "gasProgress");
        s(this, "newPlayers", new Set);
        s(this, "deletedPlayers", new Set);
        s(this, "aliveCountDirty");
        s(this, "aliveCount");
        s(this, "killFeedMessages", new Set);
        s(this, "planes", new Set);
        s(this, "mapPings", new Set)
    }
    serialize() {
        var n, c;
        super.serialize();
        const i = this.stream,
            r = (+!!Object.values(this.playerData.dirty).some(h => h) && P.PlayerData) | (+!!this.deletedObjects.size && P.DeletedObjects) | (+!!this.fullDirtyObjects.size && P.FullObjects) | (+!!this.partialDirtyObjects.size && P.PartialObjects) | (+!!this.bullets.size && P.Bullets) | (+!!this.explosions.size && P.Explosions) | (+!!this.emotes.size && P.Emotes) | (+!!((n = this.gas) != null && n.dirty) && P.Gas) | (+!!((c = this.gasProgress) != null && c.dirty) && P.GasPercentage) | (+!!this.newPlayers.size && P.NewPlayers) | (+!!this.deletedPlayers.size && P.DeletedPlayers) | (+!!this.aliveCountDirty && P.AliveCount) | (+!!this.killFeedMessages.size && P.KillFeedMessages) | (+!!this.planes.size && P.Planes) | (+!!this.mapPings.size && P.MapPings);
        if (i.writeBits(r, ri), r & P.PlayerData && ea(i, this.playerData), r & P.DeletedObjects) {
            i.writeUint16(this.deletedObjects.size);
            for (const h of this.deletedObjects) i.writeObjectID(h)
        }
        if (r & P.FullObjects) {
            i.writeUint16(this.fullDirtyObjects.size);
            for (const h of this.fullDirtyObjects) i.writeObjectID(h.id), i.writeObjectType(h.type), Qe[h.type].serializeFull(i, h.data)
        }
        if (r & P.PartialObjects) {
            i.writeUint16(this.partialDirtyObjects.size);
            for (const h of this.partialDirtyObjects) i.writeObjectID(h.id), i.writeObjectType(h.type), Qe[h.type].serializePartial(i, h.data)
        }
        if (r & P.Bullets) {
            i.writeUint8(this.bullets.size);
            for (const h of this.bullets) h.serialize(i)
        }
        if (r & P.Explosions) {
            i.writeUint8(this.explosions.size);
            for (const h of this.explosions) Ze.writeToStream(i, h.definition), i.writePosition(h.position)
        }
        if (r & P.Emotes) {
            i.writeBits(this.emotes.size, 7);
            for (const h of this.emotes) Pe.writeToStream(i, h.definition), i.writeObjectID(h.playerID)
        }
        if (r & P.Gas) {
            const h = this.gas;
            i.writeBits(h.state, 2), i.writeBits(h.currentDuration, 7), i.writePosition(h.oldPosition), i.writePosition(h.newPosition), i.writeFloat(h.oldRadius, 0, 2048, 16), i.writeFloat(h.newRadius, 0, 2048, 16)
        }
        if (r & P.GasPercentage && i.writeFloat(this.gasProgress.value, 0, 1, 16), r & P.NewPlayers) {
            i.writeUint8(this.newPlayers.size);
            for (const h of this.newPlayers) i.writeObjectID(h.id), i.writePlayerName(h.name), i.writeBoolean(h.hasColor), h.hasColor && i.writeBits(h.nameColor, 24)
        }
        if (r & P.DeletedPlayers) {
            i.writeUint8(this.deletedPlayers.size);
            for (const h of this.deletedPlayers) i.writeObjectID(h)
        }
        if (r & P.AliveCount && i.writeBits(this.aliveCount, 7), r & P.KillFeedMessages) {
            i.writeUint8(this.killFeedMessages.size);
            for (const h of this.killFeedMessages) ia(i, h)
        }
        if (r & P.Planes) {
            i.writeBits(this.planes.size, 4);
            for (const h of this.planes) i.writeVector(h.position, -C.maxPosition, -C.maxPosition, C.maxPosition * 2, C.maxPosition * 2, 24), i.writeRotation(h.direction, 16)
        }
        if (r & P.MapPings) {
            i.writeBits(this.mapPings.size, 4);
            for (const h of this.mapPings) i.writePosition(h)
        }
    }
    deserialize(i) {
        const o = i.readBits(ri);
        if (o & P.PlayerData && (this.playerData = ta(i, this.previousData)), o & P.DeletedObjects) {
            const r = i.readUint16();
            for (let n = 0; n < r; n++) this.deletedObjects.add(i.readObjectID())
        }
        if (o & P.FullObjects) {
            const r = i.readUint16();
            for (let n = 0; n < r; n++) {
                const c = i.readObjectID(),
                    h = i.readObjectType(),
                    g = Qe[h].deserializeFull(i);
                this.fullDirtyObjects.add({
                    id: c,
                    type: h,
                    data: g
                })
            }
        }
        if (o & P.PartialObjects) {
            const r = i.readUint16();
            for (let n = 0; n < r; n++) {
                const c = i.readObjectID(),
                    h = i.readObjectType(),
                    g = Qe[h].deserializePartial(i);
                this.partialDirtyObjects.add({
                    id: c,
                    type: h,
                    data: g
                })
            }
        }
        if (o & P.Bullets) {
            const r = i.readUint8();
            for (let n = 0; n < r; n++) this.deserializedBullets.add(bi.deserialize(i))
        }
        if (o & P.Explosions) {
            const r = i.readUint8();
            for (let n = 0; n < r; n++) this.explosions.add({
                definition: Ze.readFromStream(i),
                position: i.readPosition()
            })
        }
        if (o & P.Emotes) {
            const r = i.readBits(7);
            for (let n = 0; n < r; n++) this.emotes.add({
                definition: Pe.readFromStream(i),
                playerID: i.readObjectID()
            })
        }
        if (o & P.Gas && (this.gas = {
                dirty: !0,
                state: i.readBits(2),
                currentDuration: i.readBits(7),
                oldPosition: i.readPosition(),
                newPosition: i.readPosition(),
                oldRadius: i.readFloat(0, 2048, 16),
                newRadius: i.readFloat(0, 2048, 16)
            }), o & P.GasPercentage && (this.gasProgress = {
                dirty: !0,
                value: i.readFloat(0, 1, 16)
            }), o & P.NewPlayers) {
            const r = i.readUint8();
            for (let n = 0; n < r; n++) {
                const c = i.readObjectID(),
                    h = i.readPlayerName(),
                    g = i.readBoolean(),
                    u = g ? i.readBits(24) : 0;
                this.newPlayers.add({
                    id: c,
                    name: h,
                    hasColor: g,
                    nameColor: u
                })
            }
        }
        if (o & P.DeletedPlayers) {
            const r = i.readUint8();
            for (let n = 0; n < r; n++) this.deletedPlayers.add(i.readObjectID())
        }
        if (o & P.AliveCount && (this.aliveCountDirty = !0, this.aliveCount = i.readBits(7)), o & P.KillFeedMessages) {
            const r = i.readUint8();
            for (let n = 0; n < r; n++) this.killFeedMessages.add(aa(i))
        }
        if (o & P.Planes) {
            const r = i.readBits(4);
            for (let n = 0; n < r; n++) {
                const c = i.readVector(-C.maxPosition, -C.maxPosition, C.maxPosition * 2, C.maxPosition * 2, 24),
                    h = i.readRotation(16);
                this.planes.add({
                    position: c,
                    direction: h
                })
            }
        }
        if (o & P.MapPings) {
            const r = i.readBits(4);
            for (let n = 0; n < r; n++) this.mapPings.add(i.readPosition())
        }
    }
}
class ra {
    constructor() {
        s(this, "_objects", new Map);
        s(this, "_byCategory");
        this._byCategory = Object.keys(D).filter(t => !Number.isNaN(+t)).reduce((t, i) => (t[i] = new Set, t), {})
    }
    getCategory(t) {
        return this._byCategory[t]
    }
    clear() {
        this._objects.clear(), Object.values(this._byCategory).forEach(t => t.clear())
    }
    add(t) {
        this._objects.set(t.id, t), this.getCategory(t.type).add(t)
    }
    delete(t) {
        this.getCategory(t.type).delete(t), this._objects.delete(t.id)
    }
    has(t) {
        return this._objects.has(t.id)
    }
    categoryHas(t) {
        return this.getCategory(t.type).has(t)
    }
    get(t) {
        return this._objects.get(t)
    }
    hasId(t) {
        return this._objects.has(t)
    }
    get size() {
        return this._objects.size
    } [Symbol.iterator]() {
        return this._objects.values()
    }
}
const na = [{
        meta: {
            app: "vite-spritesheet-plugin",
            image: "atlases/atlas-4a174dba.png",
            scale: "1",
            size: {
                w: 4096,
                h: 4096
            }
        },
        frames: {
            _missing_texture: {
                frame: {
                    w: 64,
                    h: 64,
                    x: 0,
                    y: 0
                },
                sourceSize: {
                    w: 64,
                    h: 64
                }
            },
            airdrop_parachute: {
                frame: {
                    w: 700,
                    h: 696,
                    x: 72,
                    y: 0
                },
                sourceSize: {
                    w: 700,
                    h: 696
                }
            },
            airdrop_parachute_winter: {
                frame: {
                    w: 700,
                    h: 696,
                    x: 780,
                    y: 0
                },
                sourceSize: {
                    w: 700,
                    h: 696
                }
            },
            airdrop_ping: {
                frame: {
                    w: 201,
                    h: 201,
                    x: 0,
                    y: 704
                },
                sourceSize: {
                    w: 201,
                    h: 201
                }
            },
            airdrop_plane: {
                frame: {
                    w: 1048,
                    h: 1505,
                    x: 209,
                    y: 704
                },
                sourceSize: {
                    w: 1048,
                    h: 1505
                }
            },
            airdrop_plane_winter: {
                frame: {
                    w: 933,
                    h: 424,
                    x: 0,
                    y: 2217
                },
                sourceSize: {
                    w: 933,
                    h: 424
                }
            },
            armory_barracks_ceiling: {
                frame: {
                    w: 1035,
                    h: 1718,
                    x: 941,
                    y: 2217
                },
                sourceSize: {
                    w: 1035,
                    h: 1718
                }
            },
            armory_barracks_floor: {
                frame: {
                    w: 1081,
                    h: 1856,
                    x: 1488,
                    y: 0
                },
                sourceSize: {
                    w: 1081,
                    h: 1856
                }
            },
            armory_center_ceiling: {
                frame: {
                    w: 669,
                    h: 946,
                    x: 0,
                    y: 2649
                },
                sourceSize: {
                    w: 669,
                    h: 946
                }
            },
            armory_center_floor: {
                frame: {
                    w: 697,
                    h: 917,
                    x: 2577,
                    y: 0
                },
                sourceSize: {
                    w: 697,
                    h: 917
                }
            },
            armory_inner_vault_ceiling: {
                frame: {
                    w: 417,
                    h: 727,
                    x: 3282,
                    y: 0
                },
                sourceSize: {
                    w: 417,
                    h: 727
                }
            },
            armory_vault_ceiling: {
                frame: {
                    w: 1513,
                    h: 815,
                    x: 2577,
                    y: 925
                },
                sourceSize: {
                    w: 1513,
                    h: 815
                }
            },
            armory_vault_floor: {
                frame: {
                    w: 1483,
                    h: 882,
                    x: 2577,
                    y: 1748
                },
                sourceSize: {
                    w: 1483,
                    h: 882
                }
            },
            container_ceiling_closed: {
                frame: {
                    w: 281,
                    h: 559,
                    x: 3707,
                    y: 0
                },
                sourceSize: {
                    w: 281,
                    h: 559
                }
            },
            container_ceiling_open1: {
                frame: {
                    w: 281,
                    h: 559,
                    x: 1984,
                    y: 1864
                },
                sourceSize: {
                    w: 281,
                    h: 559
                }
            },
            container_ceiling_open1_damaged: {
                frame: {
                    w: 281,
                    h: 559,
                    x: 2273,
                    y: 1864
                },
                sourceSize: {
                    w: 281,
                    h: 559
                }
            },
            container_ceiling_open2: {
                frame: {
                    w: 281,
                    h: 559,
                    x: 1984,
                    y: 2431
                },
                sourceSize: {
                    w: 281,
                    h: 559
                }
            },
            container_ceiling_open2_damaged: {
                frame: {
                    w: 281,
                    h: 559,
                    x: 2273,
                    y: 2431
                },
                sourceSize: {
                    w: 281,
                    h: 559
                }
            },
            house_ceiling_small: {
                frame: {
                    w: 1306,
                    h: 1230,
                    x: 2562,
                    y: 2638
                },
                sourceSize: {
                    w: 1306,
                    h: 1230
                }
            },
            mobile_home_ceiling: {
                frame: {
                    w: 861,
                    h: 409,
                    x: 0,
                    y: 3603
                },
                sourceSize: {
                    w: 861,
                    h: 409
                }
            },
            port_shed_ceiling: {
                frame: {
                    w: 469,
                    h: 593,
                    x: 1984,
                    y: 2998
                },
                sourceSize: {
                    w: 469,
                    h: 593
                }
            },
            porta_potty_ceiling: {
                frame: {
                    w: 314,
                    h: 386,
                    x: 1984,
                    y: 3599
                },
                sourceSize: {
                    w: 314,
                    h: 386
                }
            },
            explosion_decal: {
                frame: {
                    w: 100,
                    h: 97,
                    x: 3996,
                    y: 0
                },
                sourceSize: {
                    w: 100,
                    h: 97
                }
            },
            floor_oil_02: {
                frame: {
                    w: 246,
                    h: 317,
                    x: 2306,
                    y: 3599
                },
                sourceSize: {
                    w: 246,
                    h: 317
                }
            },
            floor_oil_03: {
                frame: {
                    w: 135,
                    h: 178,
                    x: 3282,
                    y: 735
                },
                sourceSize: {
                    w: 135,
                    h: 178
                }
            },
            floor_oil_06: {
                frame: {
                    w: 386,
                    h: 201,
                    x: 3707,
                    y: 567
                },
                sourceSize: {
                    w: 386,
                    h: 201
                }
            },
            floor_oil_07: {
                frame: {
                    w: 178,
                    h: 245,
                    x: 0,
                    y: 913
                },
                sourceSize: {
                    w: 178,
                    h: 245
                }
            },
            frag_explosion_decal: {
                frame: {
                    w: 96,
                    h: 93,
                    x: 3996,
                    y: 105
                },
                sourceSize: {
                    w: 96,
                    h: 93
                }
            },
            smoke_explosion_decal: {
                frame: {
                    w: 48,
                    h: 54,
                    x: 0,
                    y: 72
                },
                sourceSize: {
                    w: 48,
                    h: 54
                }
            },
            aegis_logo: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 2461,
                    y: 2998
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            alien: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 2461,
                    y: 3090
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            angry_face: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 2461,
                    y: 3182
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            bandaged_face: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 2461,
                    y: 3274
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            bleh: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 2461,
                    y: 3366
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            blushing_face: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 2461,
                    y: 3458
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            carrot: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 3996,
                    y: 206
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            chicken: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 3996,
                    y: 298
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            clueless: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 3996,
                    y: 390
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            cold_face: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 869,
                    y: 3993
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            cool_face: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 961,
                    y: 3993
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            creepy_clown: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 1053,
                    y: 3993
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            dab: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 1145,
                    y: 3993
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            devil_face: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 1237,
                    y: 3993
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            disappointed_face: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 1329,
                    y: 3993
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            duel: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 1421,
                    y: 3993
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            egg: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 1513,
                    y: 3993
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            emote_background: {
                frame: {
                    w: 128,
                    h: 128,
                    x: 3425,
                    y: 776
                },
                sourceSize: {
                    w: 128,
                    h: 128
                }
            },
            ez: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 1605,
                    y: 3993
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            fire: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 1697,
                    y: 3993
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            flint_logo: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 1789,
                    y: 3993
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            froog: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 1881,
                    y: 3943
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            gg: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 1973,
                    y: 3993
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            greedy_face: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 2065,
                    y: 3993
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            grimacing_face: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 2157,
                    y: 3993
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            happy_face: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 2249,
                    y: 3993
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            headshot: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 3561,
                    y: 735
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            heart_face: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 3561,
                    y: 827
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            joyful_face: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 3653,
                    y: 776
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            lying_face: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 3745,
                    y: 776
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            melting_face: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 3837,
                    y: 776
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            monkey: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 3929,
                    y: 776
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            monocle_face: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 2341,
                    y: 3924
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            nervous_face: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 2433,
                    y: 3924
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            neutral_face: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 2525,
                    y: 3924
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            partying_face: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 0,
                    y: 1166
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            picasso_face: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 92,
                    y: 1166
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            pleading_face: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 0,
                    y: 1258
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            pog: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 92,
                    y: 1258
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            question_mark: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 0,
                    y: 1350
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            questioning_face: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 92,
                    y: 1350
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            relieved_face: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 0,
                    y: 1442
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            rip: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 92,
                    y: 1442
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            sad_face: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 0,
                    y: 1534
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            sad_smiling_face: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 92,
                    y: 1534
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            saluting_face: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 0,
                    y: 1626
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            screaming_face: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 92,
                    y: 1626
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            shushing_face: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 0,
                    y: 1718
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            sighing_face: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 92,
                    y: 1718
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            skull: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 0,
                    y: 1810
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            smirking_face: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 92,
                    y: 1810
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            sobbing_face: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 0,
                    y: 1902
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            squid: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 92,
                    y: 1902
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            suroi_logo: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 0,
                    y: 1994
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            sweating_face: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 92,
                    y: 1994
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            team_equals_ban: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 0,
                    y: 2086
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            test: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 92,
                    y: 2086
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            thinking_face: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 1265,
                    y: 704
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            thumbs_down: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 1357,
                    y: 704
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            thumbs_up: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 1265,
                    y: 796
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            tomato: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 1357,
                    y: 796
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            triumphant_face: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 1265,
                    y: 888
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            troll_face: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 1357,
                    y: 888
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            upside_down_face: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 1265,
                    y: 980
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            vomiting_face: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 1357,
                    y: 980
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            wave: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 1265,
                    y: 1072
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            zipper_mouth_face: {
                frame: {
                    w: 84,
                    h: 84,
                    x: 1357,
                    y: 1072
                },
                sourceSize: {
                    w: 84,
                    h: 84
                }
            },
            basic_helmet_world: {
                frame: {
                    w: 64,
                    h: 60,
                    x: 0,
                    y: 134
                },
                sourceSize: {
                    w: 64,
                    h: 60
                }
            },
            basic_pack_world: {
                frame: {
                    w: 35,
                    h: 60,
                    x: 1881,
                    y: 4035
                },
                sourceSize: {
                    w: 35,
                    h: 60
                }
            },
            basic_vest_world: {
                frame: {
                    w: 102,
                    h: 102,
                    x: 1265,
                    y: 1164
                },
                sourceSize: {
                    w: 102,
                    h: 102
                }
            },
            regular_helmet_world: {
                frame: {
                    w: 64,
                    h: 60,
                    x: 869,
                    y: 2649
                },
                sourceSize: {
                    w: 64,
                    h: 60
                }
            },
            regular_pack_world: {
                frame: {
                    w: 44,
                    h: 78,
                    x: 2341,
                    y: 4016
                },
                sourceSize: {
                    w: 44,
                    h: 78
                }
            },
            regular_vest_world: {
                frame: {
                    w: 102,
                    h: 102,
                    x: 1375,
                    y: 1164
                },
                sourceSize: {
                    w: 102,
                    h: 102
                }
            },
            tactical_helmet_world: {
                frame: {
                    w: 64,
                    h: 71,
                    x: 0,
                    y: 202
                },
                sourceSize: {
                    w: 64,
                    h: 71
                }
            },
            tactical_pack_world: {
                frame: {
                    w: 51,
                    h: 83,
                    x: 869,
                    y: 2717
                },
                sourceSize: {
                    w: 51,
                    h: 83
                }
            },
            tactical_vest_world: {
                frame: {
                    w: 102,
                    h: 102,
                    x: 677,
                    y: 2649
                },
                sourceSize: {
                    w: 102,
                    h: 102
                }
            },
            "127mm": {
                frame: {
                    w: 72,
                    h: 50,
                    x: 787,
                    y: 2649
                },
                sourceSize: {
                    w: 72,
                    h: 50
                }
            },
            "12g": {
                frame: {
                    w: 72,
                    h: 50,
                    x: 787,
                    y: 2707
                },
                sourceSize: {
                    w: 72,
                    h: 50
                }
            },
            "15x_scope": {
                frame: {
                    w: 64,
                    h: 64,
                    x: 0,
                    y: 281
                },
                sourceSize: {
                    w: 64,
                    h: 64
                }
            },
            "1x_scope": {
                frame: {
                    w: 64,
                    h: 64,
                    x: 869,
                    y: 2808
                },
                sourceSize: {
                    w: 64,
                    h: 64
                }
            },
            "2x_scope": {
                frame: {
                    w: 64,
                    h: 64,
                    x: 0,
                    y: 353
                },
                sourceSize: {
                    w: 64,
                    h: 64
                }
            },
            "4x_scope": {
                frame: {
                    w: 64,
                    h: 64,
                    x: 869,
                    y: 2880
                },
                sourceSize: {
                    w: 64,
                    h: 64
                }
            },
            "50ae": {
                frame: {
                    w: 72,
                    h: 50,
                    x: 4021,
                    y: 776
                },
                sourceSize: {
                    w: 72,
                    h: 50
                }
            },
            "556mm": {
                frame: {
                    w: 72,
                    h: 50,
                    x: 4021,
                    y: 834
                },
                sourceSize: {
                    w: 72,
                    h: 50
                }
            },
            "762mm": {
                frame: {
                    w: 72,
                    h: 50,
                    x: 0,
                    y: 4020
                },
                sourceSize: {
                    w: 72,
                    h: 50
                }
            },
            "8x_scope": {
                frame: {
                    w: 64,
                    h: 64,
                    x: 0,
                    y: 425
                },
                sourceSize: {
                    w: 64,
                    h: 64
                }
            },
            "9mm": {
                frame: {
                    w: 72,
                    h: 50,
                    x: 80,
                    y: 4020
                },
                sourceSize: {
                    w: 72,
                    h: 50
                }
            },
            basic_helmet: {
                frame: {
                    w: 64,
                    h: 64,
                    x: 869,
                    y: 2952
                },
                sourceSize: {
                    w: 64,
                    h: 64
                }
            },
            basic_pack: {
                frame: {
                    w: 64,
                    h: 64,
                    x: 0,
                    y: 497
                },
                sourceSize: {
                    w: 64,
                    h: 64
                }
            },
            basic_vest: {
                frame: {
                    w: 64,
                    h: 64,
                    x: 869,
                    y: 3024
                },
                sourceSize: {
                    w: 64,
                    h: 64
                }
            },
            bb: {
                frame: {
                    w: 40,
                    h: 40,
                    x: 2560,
                    y: 3876
                },
                sourceSize: {
                    w: 40,
                    h: 40
                }
            },
            cola: {
                frame: {
                    w: 28,
                    h: 48,
                    x: 4068,
                    y: 1748
                },
                sourceSize: {
                    w: 28,
                    h: 48
                }
            },
            curadell: {
                frame: {
                    w: 77,
                    h: 50,
                    x: 3996,
                    y: 482
                },
                sourceSize: {
                    w: 77,
                    h: 50
                }
            },
            gauze: {
                frame: {
                    w: 64,
                    h: 38,
                    x: 0,
                    y: 569
                },
                sourceSize: {
                    w: 64,
                    h: 38
                }
            },
            loot_background_equipment: {
                frame: {
                    w: 100,
                    h: 100,
                    x: 677,
                    y: 2759
                },
                sourceSize: {
                    w: 100,
                    h: 100
                }
            },
            loot_background_gun_127mm: {
                frame: {
                    w: 135,
                    h: 135,
                    x: 677,
                    y: 2867
                },
                sourceSize: {
                    w: 135,
                    h: 135
                }
            },
            loot_background_gun_12g: {
                frame: {
                    w: 135,
                    h: 135,
                    x: 677,
                    y: 3010
                },
                sourceSize: {
                    w: 135,
                    h: 135
                }
            },
            loot_background_gun_50ae: {
                frame: {
                    w: 135,
                    h: 135,
                    x: 1265,
                    y: 1274
                },
                sourceSize: {
                    w: 135,
                    h: 135
                }
            },
            loot_background_gun_556mm: {
                frame: {
                    w: 135,
                    h: 135,
                    x: 1265,
                    y: 1417
                },
                sourceSize: {
                    w: 135,
                    h: 135
                }
            },
            loot_background_gun_762mm: {
                frame: {
                    w: 135,
                    h: 135,
                    x: 1265,
                    y: 1560
                },
                sourceSize: {
                    w: 135,
                    h: 135
                }
            },
            loot_background_gun_9mm: {
                frame: {
                    w: 135,
                    h: 135,
                    x: 1265,
                    y: 1703
                },
                sourceSize: {
                    w: 135,
                    h: 135
                }
            },
            loot_background_gun_bb: {
                frame: {
                    w: 136,
                    h: 136,
                    x: 1265,
                    y: 1846
                },
                sourceSize: {
                    w: 136,
                    h: 136
                }
            },
            loot_background_gun_curadell: {
                frame: {
                    w: 135,
                    h: 135,
                    x: 1265,
                    y: 1990
                },
                sourceSize: {
                    w: 135,
                    h: 135
                }
            },
            loot_background_gun_power_cell: {
                frame: {
                    w: 136,
                    h: 136,
                    x: 1408,
                    y: 1990
                },
                sourceSize: {
                    w: 136,
                    h: 136
                }
            },
            loot_background_healing: {
                frame: {
                    w: 100,
                    h: 100,
                    x: 820,
                    y: 3096
                },
                sourceSize: {
                    w: 100,
                    h: 100
                }
            },
            loot_background_melee: {
                frame: {
                    w: 125,
                    h: 125,
                    x: 677,
                    y: 3153
                },
                sourceSize: {
                    w: 125,
                    h: 125
                }
            },
            loot_background_throwable: {
                frame: {
                    w: 110,
                    h: 110,
                    x: 1409,
                    y: 1864
                },
                sourceSize: {
                    w: 110,
                    h: 110
                }
            },
            medikit: {
                frame: {
                    w: 70,
                    h: 46,
                    x: 1409,
                    y: 1274
                },
                sourceSize: {
                    w: 70,
                    h: 46
                }
            },
            power_cell: {
                frame: {
                    w: 84,
                    h: 45,
                    x: 3653,
                    y: 868
                },
                sourceSize: {
                    w: 84,
                    h: 45
                }
            },
            regular_helmet: {
                frame: {
                    w: 64,
                    h: 64,
                    x: 0,
                    y: 615
                },
                sourceSize: {
                    w: 64,
                    h: 64
                }
            },
            regular_pack: {
                frame: {
                    w: 64,
                    h: 64,
                    x: 869,
                    y: 3204
                },
                sourceSize: {
                    w: 64,
                    h: 64
                }
            },
            regular_vest: {
                frame: {
                    w: 64,
                    h: 64,
                    x: 869,
                    y: 3276
                },
                sourceSize: {
                    w: 64,
                    h: 64
                }
            },
            tablets: {
                frame: {
                    w: 46,
                    h: 64,
                    x: 810,
                    y: 3204
                },
                sourceSize: {
                    w: 46,
                    h: 64
                }
            },
            tactical_helmet: {
                frame: {
                    w: 64,
                    h: 64,
                    x: 869,
                    y: 3348
                },
                sourceSize: {
                    w: 64,
                    h: 64
                }
            },
            tactical_pack: {
                frame: {
                    w: 64,
                    h: 64,
                    x: 869,
                    y: 3420
                },
                sourceSize: {
                    w: 64,
                    h: 64
                }
            },
            tactical_vest: {
                frame: {
                    w: 64,
                    h: 64,
                    x: 869,
                    y: 3492
                },
                sourceSize: {
                    w: 64,
                    h: 64
                }
            },
            aegis_crate: {
                frame: {
                    w: 185,
                    h: 185,
                    x: 3876,
                    y: 2638
                },
                sourceSize: {
                    w: 185,
                    h: 185
                }
            },
            aegis_crate_winter: {
                frame: {
                    w: 185,
                    h: 185,
                    x: 2617,
                    y: 3876
                },
                sourceSize: {
                    w: 185,
                    h: 185
                }
            },
            airdrop_crate: {
                frame: {
                    w: 185,
                    h: 185,
                    x: 3876,
                    y: 2831
                },
                sourceSize: {
                    w: 185,
                    h: 185
                }
            },
            airdrop_crate_locked: {
                frame: {
                    w: 185,
                    h: 185,
                    x: 2810,
                    y: 3876
                },
                sourceSize: {
                    w: 185,
                    h: 185
                }
            },
            airdrop_crate_locked_winter: {
                frame: {
                    w: 185,
                    h: 185,
                    x: 3876,
                    y: 3024
                },
                sourceSize: {
                    w: 185,
                    h: 185
                }
            },
            airdrop_crate_unlocking: {
                frame: {
                    w: 185,
                    h: 185,
                    x: 3003,
                    y: 3876
                },
                sourceSize: {
                    w: 185,
                    h: 185
                }
            },
            airdrop_crate_unlocking_winter: {
                frame: {
                    w: 185,
                    h: 185,
                    x: 3876,
                    y: 3217
                },
                sourceSize: {
                    w: 185,
                    h: 185
                }
            },
            airdrop_crate_winter: {
                frame: {
                    w: 183,
                    h: 183,
                    x: 677,
                    y: 3286
                },
                sourceSize: {
                    w: 183,
                    h: 183
                }
            },
            ammo_crate: {
                frame: {
                    w: 193,
                    h: 193,
                    x: 3196,
                    y: 3876
                },
                sourceSize: {
                    w: 193,
                    h: 193
                }
            },
            barrel: {
                frame: {
                    w: 150,
                    h: 150,
                    x: 3876,
                    y: 3410
                },
                sourceSize: {
                    w: 150,
                    h: 150
                }
            },
            bed: {
                frame: {
                    w: 224,
                    h: 321,
                    x: 1552,
                    y: 1864
                },
                sourceSize: {
                    w: 224,
                    h: 321
                }
            },
            blueberry_bush: {
                frame: {
                    w: 165,
                    h: 165,
                    x: 1784,
                    y: 1864
                },
                sourceSize: {
                    w: 165,
                    h: 165
                }
            },
            blueberry_bush_fall: {
                frame: {
                    w: 165,
                    h: 165,
                    x: 1784,
                    y: 2037
                },
                sourceSize: {
                    w: 165,
                    h: 165
                }
            },
            blueberry_bush_winter: {
                frame: {
                    w: 165,
                    h: 165,
                    x: 3397,
                    y: 3876
                },
                sourceSize: {
                    w: 165,
                    h: 165
                }
            },
            bollard: {
                frame: {
                    w: 179,
                    h: 184,
                    x: 3570,
                    y: 3876
                },
                sourceSize: {
                    w: 179,
                    h: 184
                }
            },
            bollard_winter: {
                frame: {
                    w: 168,
                    h: 173,
                    x: 3757,
                    y: 3876
                },
                sourceSize: {
                    w: 168,
                    h: 173
                }
            },
            box_1: {
                frame: {
                    w: 92,
                    h: 92,
                    x: 677,
                    y: 3477
                },
                sourceSize: {
                    w: 92,
                    h: 92
                }
            },
            box_2: {
                frame: {
                    w: 92,
                    h: 92,
                    x: 3933,
                    y: 3568
                },
                sourceSize: {
                    w: 92,
                    h: 92
                }
            },
            box_3: {
                frame: {
                    w: 92,
                    h: 92,
                    x: 3933,
                    y: 3668
                },
                sourceSize: {
                    w: 92,
                    h: 92
                }
            },
            box_winter_1: {
                frame: {
                    w: 86,
                    h: 86,
                    x: 3876,
                    y: 3768
                },
                sourceSize: {
                    w: 86,
                    h: 86
                }
            },
            box_winter_2: {
                frame: {
                    w: 86,
                    h: 86,
                    x: 3970,
                    y: 3768
                },
                sourceSize: {
                    w: 86,
                    h: 86
                }
            },
            box_winter_3: {
                frame: {
                    w: 86,
                    h: 86,
                    x: 3933,
                    y: 3862
                },
                sourceSize: {
                    w: 86,
                    h: 86
                }
            },
            button: {
                frame: {
                    w: 45,
                    h: 31,
                    x: 0,
                    y: 2178
                },
                sourceSize: {
                    w: 45,
                    h: 31
                }
            },
            button_activated: {
                frame: {
                    w: 45,
                    h: 31,
                    x: 777,
                    y: 3564
                },
                sourceSize: {
                    w: 45,
                    h: 31
                }
            },
            chair: {
                frame: {
                    w: 137,
                    h: 134,
                    x: 3933,
                    y: 3956
                },
                sourceSize: {
                    w: 137,
                    h: 134
                }
            },
            concrete_wall_corner: {
                frame: {
                    w: 39,
                    h: 39,
                    x: 3757,
                    y: 4057
                },
                sourceSize: {
                    w: 39,
                    h: 39
                }
            },
            concrete_wall_end: {
                frame: {
                    w: 52,
                    h: 39,
                    x: 3804,
                    y: 4057
                },
                sourceSize: {
                    w: 52,
                    h: 39
                }
            },
            concrete_wall_end_broken_1: {
                frame: {
                    w: 58,
                    h: 39,
                    x: 3864,
                    y: 4057
                },
                sourceSize: {
                    w: 58,
                    h: 39
                }
            },
            concrete_wall_end_broken_2: {
                frame: {
                    w: 61,
                    h: 39,
                    x: 4034,
                    y: 3410
                },
                sourceSize: {
                    w: 61,
                    h: 39
                }
            },
            concrete_wall_segment: {
                frame: {
                    w: 320,
                    h: 39,
                    x: 869,
                    y: 3943
                },
                sourceSize: {
                    w: 320,
                    h: 39
                }
            },
            concrete_wall_segment_long: {
                frame: {
                    w: 640,
                    h: 39,
                    x: 1197,
                    y: 3943
                },
                sourceSize: {
                    w: 640,
                    h: 39
                }
            },
            crane_base_end: {
                frame: {
                    w: 96,
                    h: 37,
                    x: 3397,
                    y: 4049
                },
                sourceSize: {
                    w: 96,
                    h: 37
                }
            },
            crane_base_end_winter: {
                frame: {
                    w: 90,
                    h: 35,
                    x: 2461,
                    y: 3550
                },
                sourceSize: {
                    w: 90,
                    h: 35
                }
            },
            door: {
                frame: {
                    w: 202,
                    h: 52,
                    x: 2393,
                    y: 4016
                },
                sourceSize: {
                    w: 202,
                    h: 52
                }
            },
            garage_door: {
                frame: {
                    w: 435,
                    h: 47,
                    x: 160,
                    y: 4020
                },
                sourceSize: {
                    w: 435,
                    h: 47
                }
            },
            gun_mount_mcx_spear: {
                frame: {
                    w: 220,
                    h: 74,
                    x: 1265,
                    y: 2134
                },
                sourceSize: {
                    w: 220,
                    h: 74
                }
            },
            gun_mount_stoner_63: {
                frame: {
                    w: 220,
                    h: 74,
                    x: 603,
                    y: 4020
                },
                sourceSize: {
                    w: 220,
                    h: 74
                }
            },
            house_wall_1: {
                frame: {
                    w: 183,
                    h: 41,
                    x: 3745,
                    y: 868
                },
                sourceSize: {
                    w: 183,
                    h: 41
                }
            },
            mobile_home_tire: {
                frame: {
                    w: 69,
                    h: 167,
                    x: 1409,
                    y: 1328
                },
                sourceSize: {
                    w: 69,
                    h: 167
                }
            },
            porta_potty_front_wall: {
                frame: {
                    w: 64,
                    h: 39,
                    x: 869,
                    y: 3564
                },
                sourceSize: {
                    w: 64,
                    h: 39
                }
            },
            ship_cabin_window: {
                frame: {
                    w: 28,
                    h: 187,
                    x: 4068,
                    y: 1804
                },
                sourceSize: {
                    w: 28,
                    h: 187
                }
            },
            tv: {
                frame: {
                    w: 34,
                    h: 325,
                    x: 1408,
                    y: 1503
                },
                sourceSize: {
                    w: 34,
                    h: 325
                }
            },
            window: {
                frame: {
                    w: 45,
                    h: 200,
                    x: 4034,
                    y: 3457
                },
                sourceSize: {
                    w: 45,
                    h: 200
                }
            },
            "127mm_particle": {
                frame: {
                    w: 30,
                    h: 76,
                    x: 831,
                    y: 4020
                },
                sourceSize: {
                    w: 30,
                    h: 76
                }
            },
            "12g_particle": {
                frame: {
                    w: 20,
                    h: 49,
                    x: 3936,
                    y: 868
                },
                sourceSize: {
                    w: 20,
                    h: 49
                }
            },
            "556mm_particle": {
                frame: {
                    w: 17,
                    h: 54,
                    x: 184,
                    y: 1166
                },
                sourceSize: {
                    w: 17,
                    h: 54
                }
            },
            "762mm_particle": {
                frame: {
                    w: 19,
                    h: 51,
                    x: 1957,
                    y: 1864
                },
                sourceSize: {
                    w: 19,
                    h: 51
                }
            },
            "9mm_particle": {
                frame: {
                    w: 18,
                    h: 35,
                    x: 4078,
                    y: 3665
                },
                sourceSize: {
                    w: 18,
                    h: 35
                }
            },
            adrenaline_particle: {
                frame: {
                    w: 30,
                    h: 30,
                    x: 1450,
                    y: 1503
                },
                sourceSize: {
                    w: 30,
                    h: 30
                }
            },
            aegis_crate_particle: {
                frame: {
                    w: 75,
                    h: 75,
                    x: 785,
                    y: 2765
                },
                sourceSize: {
                    w: 75,
                    h: 75
                }
            },
            airdrop_crate_particle: {
                frame: {
                    w: 75,
                    h: 75,
                    x: 777,
                    y: 3477
                },
                sourceSize: {
                    w: 75,
                    h: 75
                }
            },
            airdrop_particle_2: {
                frame: {
                    w: 38,
                    h: 158,
                    x: 820,
                    y: 2848
                },
                sourceSize: {
                    w: 38,
                    h: 158
                }
            },
            airdrop_particle_2_winter: {
                frame: {
                    w: 38,
                    h: 158,
                    x: 3876,
                    y: 3568
                },
                sourceSize: {
                    w: 38,
                    h: 158
                }
            },
            barrel_particle: {
                frame: {
                    w: 58,
                    h: 49,
                    x: 4033,
                    y: 3708
                },
                sourceSize: {
                    w: 58,
                    h: 49
                }
            },
            birch_tree_particle_fall: {
                frame: {
                    w: 38,
                    h: 81,
                    x: 4027,
                    y: 3862
                },
                sourceSize: {
                    w: 38,
                    h: 81
                }
            },
            birch_tree_particle_winter: {
                frame: {
                    w: 53,
                    h: 114,
                    x: 869,
                    y: 3611
                },
                sourceSize: {
                    w: 53,
                    h: 114
                }
            },
            blood_particle: {
                frame: {
                    w: 40,
                    h: 37,
                    x: 1924,
                    y: 4035
                },
                sourceSize: {
                    w: 40,
                    h: 37
                }
            },
            box_particle: {
                frame: {
                    w: 55,
                    h: 58,
                    x: 869,
                    y: 3733
                },
                sourceSize: {
                    w: 55,
                    h: 58
                }
            },
            briefcase_particle: {
                frame: {
                    w: 57,
                    h: 35,
                    x: 3501,
                    y: 4049
                },
                sourceSize: {
                    w: 57,
                    h: 35
                }
            },
            bush_particle_1: {
                frame: {
                    w: 64,
                    h: 53,
                    x: 869,
                    y: 3799
                },
                sourceSize: {
                    w: 64,
                    h: 53
                }
            },
            bush_particle_1_winter: {
                frame: {
                    w: 64,
                    h: 53,
                    x: 869,
                    y: 3860
                },
                sourceSize: {
                    w: 64,
                    h: 53
                }
            },
            curadell_particle: {
                frame: {
                    w: 30,
                    h: 47,
                    x: 1450,
                    y: 1541
                },
                sourceSize: {
                    w: 30,
                    h: 47
                }
            },
            fence_particle: {
                frame: {
                    w: 32,
                    h: 32,
                    x: 4064,
                    y: 3765
                },
                sourceSize: {
                    w: 32,
                    h: 32
                }
            },
            flint_stone_particle_1: {
                frame: {
                    w: 35,
                    h: 39,
                    x: 820,
                    y: 3014
                },
                sourceSize: {
                    w: 35,
                    h: 39
                }
            },
            flint_stone_particle_2: {
                frame: {
                    w: 41,
                    h: 37,
                    x: 3964,
                    y: 868
                },
                sourceSize: {
                    w: 41,
                    h: 37
                }
            },
            gold_rock_particle: {
                frame: {
                    w: 37,
                    h: 40,
                    x: 1493,
                    y: 2134
                },
                sourceSize: {
                    w: 37,
                    h: 40
                }
            },
            heal_mass_particle: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 4033,
                    y: 3665
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            health_particle: {
                frame: {
                    w: 30,
                    h: 30,
                    x: 1450,
                    y: 1596
                },
                sourceSize: {
                    w: 30,
                    h: 30
                }
            },
            muzzle_flash: {
                frame: {
                    w: 30,
                    h: 23,
                    x: 1450,
                    y: 1634
                },
                sourceSize: {
                    w: 30,
                    h: 23
                }
            },
            pumpkin_particle: {
                frame: {
                    w: 28,
                    h: 25,
                    x: 1845,
                    y: 3943
                },
                sourceSize: {
                    w: 28,
                    h: 25
                }
            },
            proj_frag_lever: {
                frame: {
                    w: 28,
                    h: 39,
                    x: 4068,
                    y: 1999
                },
                sourceSize: {
                    w: 28,
                    h: 39
                }
            },
            proj_frag_pin: {
                frame: {
                    w: 23,
                    h: 23,
                    x: 4073,
                    y: 3805
                },
                sourceSize: {
                    w: 23,
                    h: 23
                }
            },
            proj_smoke: {
                frame: {
                    w: 30,
                    h: 65,
                    x: 1450,
                    y: 1665
                },
                sourceSize: {
                    w: 30,
                    h: 65
                }
            },
            proj_smoke_lever: {
                frame: {
                    w: 19,
                    h: 36,
                    x: 1957,
                    y: 1923
                },
                sourceSize: {
                    w: 19,
                    h: 36
                }
            },
            proj_smoke_pin: {
                frame: {
                    w: 26,
                    h: 26,
                    x: 3876,
                    y: 3734
                },
                sourceSize: {
                    w: 26,
                    h: 26
                }
            },
            ship_cabin_window_residue: {
                frame: {
                    w: 30,
                    h: 200,
                    x: 1449,
                    y: 704
                },
                sourceSize: {
                    w: 30,
                    h: 200
                }
            },
            aimTrail: {
                frame: {
                    w: 19,
                    h: 77,
                    x: 1957,
                    y: 1967
                },
                sourceSize: {
                    w: 19,
                    h: 77
                }
            },
            base_trail: {
                frame: {
                    w: 500,
                    h: 10,
                    x: 869,
                    y: 4085
                },
                sourceSize: {
                    w: 500,
                    h: 10
                }
            },
            debug_trail: {
                frame: {
                    w: 250,
                    h: 10,
                    x: 1924,
                    y: 4085
                },
                sourceSize: {
                    w: 250,
                    h: 10
                }
            },
            acr_world: {
                frame: {
                    w: 108,
                    h: 18,
                    x: 0,
                    y: 4078
                },
                sourceSize: {
                    w: 108,
                    h: 18
                }
            },
            ak47_world: {
                frame: {
                    w: 123,
                    h: 23,
                    x: 2603,
                    y: 4069
                },
                sourceSize: {
                    w: 123,
                    h: 23
                }
            },
            arx160_world: {
                frame: {
                    w: 124,
                    h: 22,
                    x: 3425,
                    y: 735
                },
                sourceSize: {
                    w: 124,
                    h: 22
                }
            },
            aug_world: {
                frame: {
                    w: 121,
                    h: 27,
                    x: 2734,
                    y: 4069
                },
                sourceSize: {
                    w: 121,
                    h: 27
                }
            },
            cz75a_world: {
                frame: {
                    w: 67,
                    h: 17,
                    x: 677,
                    y: 3577
                },
                sourceSize: {
                    w: 67,
                    h: 17
                }
            },
            deathray_world: {
                frame: {
                    w: 162,
                    h: 19,
                    x: 2863,
                    y: 4077
                },
                sourceSize: {
                    w: 162,
                    h: 19
                }
            },
            flues_world: {
                frame: {
                    w: 92,
                    h: 20,
                    x: 2393,
                    y: 4076
                },
                sourceSize: {
                    w: 92,
                    h: 20
                }
            },
            g19_world: {
                frame: {
                    w: 59,
                    h: 16,
                    x: 1493,
                    y: 2193
                },
                sourceSize: {
                    w: 59,
                    h: 16
                }
            },
            hp18_world: {
                frame: {
                    w: 120,
                    h: 18,
                    x: 116,
                    y: 4078
                },
                sourceSize: {
                    w: 120,
                    h: 18
                }
            },
            m16a4_world: {
                frame: {
                    w: 148,
                    h: 24,
                    x: 53,
                    y: 2178
                },
                sourceSize: {
                    w: 148,
                    h: 24
                }
            },
            m1895_world: {
                frame: {
                    w: 66,
                    h: 25,
                    x: 4013,
                    y: 892
                },
                sourceSize: {
                    w: 66,
                    h: 25
                }
            },
            m1_garand_world: {
                frame: {
                    w: 154,
                    h: 18,
                    x: 3033,
                    y: 4077
                },
                sourceSize: {
                    w: 154,
                    h: 18
                }
            },
            m3k_world: {
                frame: {
                    w: 132,
                    h: 26,
                    x: 3566,
                    y: 4068
                },
                sourceSize: {
                    w: 132,
                    h: 26
                }
            },
            micro_uzi_world: {
                frame: {
                    w: 72,
                    h: 17,
                    x: 3996,
                    y: 540
                },
                sourceSize: {
                    w: 72,
                    h: 17
                }
            },
            mini14_world: {
                frame: {
                    w: 129,
                    h: 16,
                    x: 1560,
                    y: 2193
                },
                sourceSize: {
                    w: 129,
                    h: 16
                }
            },
            model_37_world: {
                frame: {
                    w: 126,
                    h: 20,
                    x: 244,
                    y: 4075
                },
                sourceSize: {
                    w: 126,
                    h: 20
                }
            },
            s_g17_world: {
                frame: {
                    w: 121,
                    h: 20,
                    x: 378,
                    y: 4075
                },
                sourceSize: {
                    w: 121,
                    h: 20
                }
            },
            saf_200_world: {
                frame: {
                    w: 96,
                    h: 18,
                    x: 3195,
                    y: 4077
                },
                sourceSize: {
                    w: 96,
                    h: 18
                }
            }
        }
    }, {
        meta: {
            app: "vite-spritesheet-plugin",
            image: "atlases/atlas-d91989eb.png",
            scale: "1",
            size: {
                w: 4096,
                h: 4096
            }
        },
        frames: {
            crane_ceiling: {
                frame: {
                    w: 4095,
                    h: 1131,
                    x: 0,
                    y: 0
                },
                sourceSize: {
                    w: 4095,
                    h: 1131
                }
            },
            house_ceiling: {
                frame: {
                    w: 1989,
                    h: 1472,
                    x: 0,
                    y: 1139
                },
                sourceSize: {
                    w: 1989,
                    h: 1472
                }
            },
            house_floor: {
                frame: {
                    w: 1935,
                    h: 1507,
                    x: 1997,
                    y: 1139
                },
                sourceSize: {
                    w: 1935,
                    h: 1507
                }
            },
            house_floor_small: {
                frame: {
                    w: 1333,
                    h: 1372,
                    x: 0,
                    y: 2654
                },
                sourceSize: {
                    w: 1333,
                    h: 1372
                }
            },
            mobile_home_floor: {
                frame: {
                    w: 942,
                    h: 530,
                    x: 1341,
                    y: 2654
                },
                sourceSize: {
                    w: 942,
                    h: 530
                }
            },
            mobile_home_residue: {
                frame: {
                    w: 942,
                    h: 530,
                    x: 1341,
                    y: 3192
                },
                sourceSize: {
                    w: 942,
                    h: 530
                }
            },
            oil_tanker_ship_ceiling: {
                frame: {
                    w: 1613,
                    h: 732,
                    x: 2291,
                    y: 2654
                },
                sourceSize: {
                    w: 1613,
                    h: 732
                }
            },
            port_shed_floor: {
                frame: {
                    w: 476,
                    h: 658,
                    x: 2291,
                    y: 3394
                },
                sourceSize: {
                    w: 476,
                    h: 658
                }
            },
            porta_potty_floor: {
                frame: {
                    w: 307,
                    h: 435,
                    x: 2775,
                    y: 3394
                },
                sourceSize: {
                    w: 307,
                    h: 435
                }
            },
            porta_potty_residue: {
                frame: {
                    w: 311,
                    h: 353,
                    x: 1341,
                    y: 3730
                },
                sourceSize: {
                    w: 311,
                    h: 353
                }
            },
            container_mark: {
                frame: {
                    w: 271,
                    h: 530,
                    x: 3090,
                    y: 3394
                },
                sourceSize: {
                    w: 271,
                    h: 530
                }
            },
            floor_oil_01: {
                frame: {
                    w: 425,
                    h: 351,
                    x: 1660,
                    y: 3730
                },
                sourceSize: {
                    w: 425,
                    h: 351
                }
            },
            floor_oil_04: {
                frame: {
                    w: 645,
                    h: 629,
                    x: 3369,
                    y: 3394
                },
                sourceSize: {
                    w: 645,
                    h: 629
                }
            },
            barrier: {
                frame: {
                    w: 132,
                    h: 748,
                    x: 3940,
                    y: 1139
                },
                sourceSize: {
                    w: 132,
                    h: 748
                }
            },
            barrier_winter: {
                frame: {
                    w: 124,
                    h: 702,
                    x: 3912,
                    y: 2654
                },
                sourceSize: {
                    w: 124,
                    h: 702
                }
            },
            bookshelf_1: {
                frame: {
                    w: 250,
                    h: 85,
                    x: 2775,
                    y: 3837
                },
                sourceSize: {
                    w: 250,
                    h: 85
                }
            },
            bookshelf_2: {
                frame: {
                    w: 250,
                    h: 85,
                    x: 2775,
                    y: 3930
                },
                sourceSize: {
                    w: 250,
                    h: 85
                }
            },
            bush: {
                frame: {
                    w: 165,
                    h: 165,
                    x: 2093,
                    y: 3730
                },
                sourceSize: {
                    w: 165,
                    h: 165
                }
            },
            bush_winter: {
                frame: {
                    w: 165,
                    h: 165,
                    x: 2093,
                    y: 3903
                },
                sourceSize: {
                    w: 165,
                    h: 165
                }
            },
            cabinet: {
                frame: {
                    w: 288,
                    h: 97,
                    x: 3033,
                    y: 3932
                },
                sourceSize: {
                    w: 288,
                    h: 97
                }
            },
            couch: {
                frame: {
                    w: 148,
                    h: 317,
                    x: 3940,
                    y: 1895
                },
                sourceSize: {
                    w: 148,
                    h: 317
                }
            },
            flint_stone: {
                frame: {
                    w: 125,
                    h: 125,
                    x: 3940,
                    y: 2220
                },
                sourceSize: {
                    w: 125,
                    h: 125
                }
            },
            grenade_crate: {
                frame: {
                    w: 132,
                    h: 142,
                    x: 3940,
                    y: 2353
                },
                sourceSize: {
                    w: 132,
                    h: 142
                }
            },
            grenade_crate_winter: {
                frame: {
                    w: 132,
                    h: 142,
                    x: 3940,
                    y: 2503
                },
                sourceSize: {
                    w: 132,
                    h: 142
                }
            },
            house_wall_2: {
                frame: {
                    w: 420,
                    h: 41,
                    x: 2775,
                    y: 4037
                },
                sourceSize: {
                    w: 420,
                    h: 41
                }
            },
            house_wall_3: {
                frame: {
                    w: 229,
                    h: 41,
                    x: 3203,
                    y: 4037
                },
                sourceSize: {
                    w: 229,
                    h: 41
                }
            },
            house_wall_4: {
                frame: {
                    w: 430,
                    h: 41,
                    x: 0,
                    y: 4034
                },
                sourceSize: {
                    w: 430,
                    h: 41
                }
            },
            house_wall_5: {
                frame: {
                    w: 322,
                    h: 41,
                    x: 438,
                    y: 4034
                },
                sourceSize: {
                    w: 322,
                    h: 41
                }
            },
            inner_concrete_wall_1: {
                frame: {
                    w: 216,
                    h: 39,
                    x: 768,
                    y: 4034
                },
                sourceSize: {
                    w: 216,
                    h: 39
                }
            },
            mobile_home_wall_1: {
                frame: {
                    w: 139,
                    h: 34,
                    x: 2266,
                    y: 4060
                },
                sourceSize: {
                    w: 139,
                    h: 34
                }
            },
            mobile_home_wall_2: {
                frame: {
                    w: 216,
                    h: 34,
                    x: 2413,
                    y: 4060
                },
                sourceSize: {
                    w: 216,
                    h: 34
                }
            },
            mobile_home_wall_3: {
                frame: {
                    w: 409,
                    h: 34,
                    x: 3440,
                    y: 4031
                },
                sourceSize: {
                    w: 409,
                    h: 34
                }
            },
            mobile_home_window: {
                frame: {
                    w: 276,
                    h: 45,
                    x: 992,
                    y: 4034
                },
                sourceSize: {
                    w: 276,
                    h: 45
                }
            },
            port_fence: {
                frame: {
                    w: 177,
                    h: 40,
                    x: 3857,
                    y: 4031
                },
                sourceSize: {
                    w: 177,
                    h: 40
                }
            },
            birch_tree_particle: {
                frame: {
                    w: 69,
                    h: 114,
                    x: 4022,
                    y: 3364
                },
                sourceSize: {
                    w: 69,
                    h: 114
                }
            },
            bush_particle_2: {
                frame: {
                    w: 64,
                    h: 64,
                    x: 4022,
                    y: 3486
                },
                sourceSize: {
                    w: 64,
                    h: 64
                }
            },
            bush_particle_2_winter: {
                frame: {
                    w: 64,
                    h: 64,
                    x: 4022,
                    y: 3558
                },
                sourceSize: {
                    w: 64,
                    h: 64
                }
            },
            metal_particle: {
                frame: {
                    w: 58,
                    h: 49,
                    x: 4022,
                    y: 3630
                },
                sourceSize: {
                    w: 58,
                    h: 49
                }
            },
            oak_tree_particle: {
                frame: {
                    w: 69,
                    h: 114,
                    x: 4022,
                    y: 3687
                },
                sourceSize: {
                    w: 69,
                    h: 114
                }
            },
            oak_tree_particle_fall: {
                frame: {
                    w: 69,
                    h: 114,
                    x: 4022,
                    y: 3809
                },
                sourceSize: {
                    w: 69,
                    h: 114
                }
            },
            power_cell_particle: {
                frame: {
                    w: 44,
                    h: 83,
                    x: 3033,
                    y: 3837
                },
                sourceSize: {
                    w: 44,
                    h: 83
                }
            },
            river_rock_particle_1: {
                frame: {
                    w: 51,
                    h: 40,
                    x: 4044,
                    y: 2653
                },
                sourceSize: {
                    w: 51,
                    h: 40
                }
            },
            river_rock_particle_2: {
                frame: {
                    w: 47,
                    h: 46,
                    x: 4044,
                    y: 2701
                },
                sourceSize: {
                    w: 47,
                    h: 46
                }
            },
            rock_particle_1: {
                frame: {
                    w: 35,
                    h: 39,
                    x: 4044,
                    y: 2755
                },
                sourceSize: {
                    w: 35,
                    h: 39
                }
            },
            rock_particle_2: {
                frame: {
                    w: 41,
                    h: 37,
                    x: 4044,
                    y: 2802
                },
                sourceSize: {
                    w: 41,
                    h: 37
                }
            },
            sandbags_particle: {
                frame: {
                    w: 41,
                    h: 37,
                    x: 4044,
                    y: 2847
                },
                sourceSize: {
                    w: 41,
                    h: 37
                }
            },
            ship_cabin_window_particle: {
                frame: {
                    w: 35,
                    h: 35,
                    x: 2637,
                    y: 4060
                },
                sourceSize: {
                    w: 35,
                    h: 35
                }
            },
            smoke_particle: {
                frame: {
                    w: 40,
                    h: 40,
                    x: 4044,
                    y: 2892
                },
                sourceSize: {
                    w: 40,
                    h: 40
                }
            },
            super_barrel_fire_particle: {
                frame: {
                    w: 34,
                    h: 42,
                    x: 4044,
                    y: 2940
                },
                sourceSize: {
                    w: 34,
                    h: 42
                }
            },
            super_barrel_particle: {
                frame: {
                    w: 58,
                    h: 49,
                    x: 4022,
                    y: 3931
                },
                sourceSize: {
                    w: 58,
                    h: 49
                }
            },
            toilet_particle: {
                frame: {
                    w: 38,
                    h: 38,
                    x: 4044,
                    y: 2990
                },
                sourceSize: {
                    w: 38,
                    h: 38
                }
            },
            window_particle: {
                frame: {
                    w: 35,
                    h: 35,
                    x: 4022,
                    y: 3988
                },
                sourceSize: {
                    w: 35,
                    h: 35
                }
            },
            proj_frag: {
                frame: {
                    w: 42,
                    h: 65,
                    x: 4042,
                    y: 4031
                },
                sourceSize: {
                    w: 42,
                    h: 65
                }
            },
            proj_smoke_nopin: {
                frame: {
                    w: 40,
                    h: 65,
                    x: 4044,
                    y: 3036
                },
                sourceSize: {
                    w: 40,
                    h: 65
                }
            },
            window_residue: {
                frame: {
                    w: 45,
                    h: 200,
                    x: 4044,
                    y: 3109
                },
                sourceSize: {
                    w: 45,
                    h: 200
                }
            },
            "123op_fist": {
                frame: {
                    w: 34,
                    h: 34,
                    x: 2680,
                    y: 4060
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            algae_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 2722,
                    y: 4060
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            aquatic_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 4044,
                    y: 3317
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            arctic_camo_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 1276,
                    y: 4034
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            mcx_spear_world: {
                frame: {
                    w: 149,
                    h: 25,
                    x: 0,
                    y: 2619
                },
                sourceSize: {
                    w: 149,
                    h: 25
                }
            },
            mp40_world: {
                frame: {
                    w: 114,
                    h: 22,
                    x: 3440,
                    y: 4073
                },
                sourceSize: {
                    w: 114,
                    h: 22
                }
            },
            revitalizer_world: {
                frame: {
                    w: 141,
                    h: 22,
                    x: 3562,
                    y: 4073
                },
                sourceSize: {
                    w: 141,
                    h: 22
                }
            },
            sr25_world: {
                frame: {
                    w: 132,
                    h: 14,
                    x: 768,
                    y: 4081
                },
                sourceSize: {
                    w: 132,
                    h: 14
                }
            },
            tango_51_world: {
                frame: {
                    w: 180,
                    h: 26,
                    x: 157,
                    y: 2619
                },
                sourceSize: {
                    w: 180,
                    h: 26
                }
            },
            usas12_world: {
                frame: {
                    w: 131,
                    h: 24,
                    x: 345,
                    y: 2619
                },
                sourceSize: {
                    w: 131,
                    h: 24
                }
            },
            vector_world: {
                frame: {
                    w: 128,
                    h: 19,
                    x: 2093,
                    y: 4076
                },
                sourceSize: {
                    w: 128,
                    h: 19
                }
            },
            vepr12_world: {
                frame: {
                    w: 122,
                    h: 20,
                    x: 3711,
                    y: 4073
                },
                sourceSize: {
                    w: 122,
                    h: 20
                }
            },
            vss_world: {
                frame: {
                    w: 121,
                    h: 18,
                    x: 484,
                    y: 2619
                },
                sourceSize: {
                    w: 121,
                    h: 18
                }
            }
        }
    }, {
        meta: {
            app: "vite-spritesheet-plugin",
            image: "atlases/atlas-8470386e.png",
            scale: "1",
            size: {
                w: 4096,
                h: 4096
            }
        },
        frames: {
            oil_tanker_ship_floor_1: {
                frame: {
                    w: 2079,
                    h: 2378,
                    x: 0,
                    y: 0
                },
                sourceSize: {
                    w: 2079,
                    h: 2378
                }
            },
            oil_tanker_ship_tank_ceiling: {
                frame: {
                    w: 741,
                    h: 3452,
                    x: 2087,
                    y: 0
                },
                sourceSize: {
                    w: 741,
                    h: 3452
                }
            },
            port_warehouse_ceiling_blue: {
                frame: {
                    w: 1219,
                    h: 2453,
                    x: 2836,
                    y: 0
                },
                sourceSize: {
                    w: 1219,
                    h: 2453
                }
            },
            port_warehouse_floor: {
                frame: {
                    w: 1308,
                    h: 1209,
                    x: 0,
                    y: 2386
                },
                sourceSize: {
                    w: 1308,
                    h: 1209
                }
            },
            ship_cabin_roof: {
                frame: {
                    w: 1149,
                    h: 1018,
                    x: 2836,
                    y: 2461
                },
                sourceSize: {
                    w: 1149,
                    h: 1018
                }
            },
            floor_oil_05: {
                frame: {
                    w: 624,
                    h: 397,
                    x: 0,
                    y: 3603
                },
                sourceSize: {
                    w: 624,
                    h: 397
                }
            },
            explosion_1: {
                frame: {
                    w: 640,
                    h: 640,
                    x: 1316,
                    y: 2386
                },
                sourceSize: {
                    w: 640,
                    h: 640
                }
            },
            birch_tree: {
                frame: {
                    w: 540,
                    h: 546,
                    x: 1316,
                    y: 3487
                },
                sourceSize: {
                    w: 540,
                    h: 546
                }
            },
            birch_tree_fall: {
                frame: {
                    w: 540,
                    h: 546,
                    x: 1864,
                    y: 3487
                },
                sourceSize: {
                    w: 540,
                    h: 546
                }
            },
            birch_tree_winter: {
                frame: {
                    w: 336,
                    h: 393,
                    x: 1316,
                    y: 3034
                },
                sourceSize: {
                    w: 336,
                    h: 393
                }
            },
            briefcase: {
                frame: {
                    w: 212,
                    h: 166,
                    x: 2412,
                    y: 3460
                },
                sourceSize: {
                    w: 212,
                    h: 166
                }
            },
            bunk_bed: {
                frame: {
                    w: 209,
                    h: 351,
                    x: 1660,
                    y: 3034
                },
                sourceSize: {
                    w: 209,
                    h: 351
                }
            },
            container_walls_open1: {
                frame: {
                    w: 281,
                    h: 559,
                    x: 2632,
                    y: 3487
                },
                sourceSize: {
                    w: 281,
                    h: 559
                }
            },
            container_walls_open2: {
                frame: {
                    w: 281,
                    h: 559,
                    x: 2921,
                    y: 3487
                },
                sourceSize: {
                    w: 281,
                    h: 559
                }
            },
            distillation_column: {
                frame: {
                    w: 210,
                    h: 235,
                    x: 2412,
                    y: 3634
                },
                sourceSize: {
                    w: 210,
                    h: 235
                }
            },
            distillation_column_winter: {
                frame: {
                    w: 197,
                    h: 221,
                    x: 1877,
                    y: 3034
                },
                sourceSize: {
                    w: 197,
                    h: 221
                }
            },
            distillation_equipment: {
                frame: {
                    w: 572,
                    h: 403,
                    x: 632,
                    y: 3603
                },
                sourceSize: {
                    w: 572,
                    h: 403
                }
            },
            flint_crate: {
                frame: {
                    w: 185,
                    h: 185,
                    x: 1877,
                    y: 3263
                },
                sourceSize: {
                    w: 185,
                    h: 185
                }
            },
            flint_crate_winter: {
                frame: {
                    w: 185,
                    h: 186,
                    x: 2412,
                    y: 3877
                },
                sourceSize: {
                    w: 185,
                    h: 186
                }
            },
            forklift: {
                frame: {
                    w: 190,
                    h: 499,
                    x: 3210,
                    y: 3487
                },
                sourceSize: {
                    w: 190,
                    h: 499
                }
            },
            forklift_winter: {
                frame: {
                    w: 178,
                    h: 468,
                    x: 3408,
                    y: 3487
                },
                sourceSize: {
                    w: 178,
                    h: 468
                }
            },
            fridge: {
                frame: {
                    w: 182,
                    h: 139,
                    x: 3594,
                    y: 3487
                },
                sourceSize: {
                    w: 182,
                    h: 139
                }
            },
            generator: {
                frame: {
                    w: 201,
                    h: 162,
                    x: 3784,
                    y: 3487
                },
                sourceSize: {
                    w: 201,
                    h: 162
                }
            },
            generator_winter: {
                frame: {
                    w: 189,
                    h: 152,
                    x: 3594,
                    y: 3657
                },
                sourceSize: {
                    w: 189,
                    h: 152
                }
            },
            gold_airdrop_crate: {
                frame: {
                    w: 185,
                    h: 185,
                    x: 3594,
                    y: 3817
                },
                sourceSize: {
                    w: 185,
                    h: 185
                }
            },
            gold_airdrop_crate_winter: {
                frame: {
                    w: 183,
                    h: 183,
                    x: 3787,
                    y: 3817
                },
                sourceSize: {
                    w: 183,
                    h: 183
                }
            },
            gun_case: {
                frame: {
                    w: 204,
                    h: 112,
                    x: 3791,
                    y: 3657
                },
                sourceSize: {
                    w: 204,
                    h: 112
                }
            },
            gun_mount_maul: {
                frame: {
                    w: 153,
                    h: 81,
                    x: 0,
                    y: 4014
                },
                sourceSize: {
                    w: 153,
                    h: 81
                }
            },
            inner_concrete_wall_2: {
                frame: {
                    w: 733,
                    h: 39,
                    x: 2605,
                    y: 4054
                },
                sourceSize: {
                    w: 733,
                    h: 39
                }
            },
            inner_concrete_wall_3: {
                frame: {
                    w: 783,
                    h: 39,
                    x: 161,
                    y: 4041
                },
                sourceSize: {
                    w: 783,
                    h: 39
                }
            },
            inner_concrete_wall_4: {
                frame: {
                    w: 943,
                    h: 42,
                    x: 952,
                    y: 4041
                },
                sourceSize: {
                    w: 943,
                    h: 42
                }
            },
            melee_crate: {
                frame: {
                    w: 125,
                    h: 125,
                    x: 3408,
                    y: 3963
                },
                sourceSize: {
                    w: 125,
                    h: 125
                }
            },
            porta_potty_back_wall: {
                frame: {
                    w: 253,
                    h: 36,
                    x: 1316,
                    y: 3435
                },
                sourceSize: {
                    w: 253,
                    h: 36
                }
            },
            porta_potty_door: {
                frame: {
                    w: 200,
                    h: 51,
                    x: 1903,
                    y: 4041
                },
                sourceSize: {
                    w: 200,
                    h: 51
                }
            },
            porta_potty_toilet_paper_wall: {
                frame: {
                    w: 384,
                    h: 83,
                    x: 3541,
                    y: 4010
                },
                sourceSize: {
                    w: 384,
                    h: 83
                }
            },
            pumpkin: {
                frame: {
                    w: 103,
                    h: 103,
                    x: 3993,
                    y: 2461
                },
                sourceSize: {
                    w: 103,
                    h: 103
                }
            },
            vault_door: {
                frame: {
                    w: 285,
                    h: 54,
                    x: 2111,
                    y: 4041
                },
                sourceSize: {
                    w: 285,
                    h: 54
                }
            },
            airdrop_crate_particle_winter: {
                frame: {
                    w: 75,
                    h: 75,
                    x: 1660,
                    y: 3393
                },
                sourceSize: {
                    w: 75,
                    h: 75
                }
            },
            christmas_tree_particle: {
                frame: {
                    w: 116,
                    h: 214,
                    x: 3978,
                    y: 3777
                },
                sourceSize: {
                    w: 116,
                    h: 214
                }
            },
            crate_particle: {
                frame: {
                    w: 75,
                    h: 75,
                    x: 1743,
                    y: 3393
                },
                sourceSize: {
                    w: 75,
                    h: 75
                }
            },
            flint_crate_particle: {
                frame: {
                    w: 75,
                    h: 75,
                    x: 3933,
                    y: 4008
                },
                sourceSize: {
                    w: 75,
                    h: 75
                }
            },
            furniture_particle: {
                frame: {
                    w: 75,
                    h: 75,
                    x: 4016,
                    y: 3999
                },
                sourceSize: {
                    w: 75,
                    h: 75
                }
            },
            grenade_crate_particle: {
                frame: {
                    w: 75,
                    h: 75,
                    x: 4003,
                    y: 2572
                },
                sourceSize: {
                    w: 75,
                    h: 75
                }
            },
            gun_case_particle: {
                frame: {
                    w: 75,
                    h: 75,
                    x: 4003,
                    y: 2655
                },
                sourceSize: {
                    w: 75,
                    h: 75
                }
            },
            oak_tree_particle_winter: {
                frame: {
                    w: 69,
                    h: 114,
                    x: 4003,
                    y: 2738
                },
                sourceSize: {
                    w: 69,
                    h: 114
                }
            },
            pine_tree_particle: {
                frame: {
                    w: 70,
                    h: 114,
                    x: 4003,
                    y: 2860
                },
                sourceSize: {
                    w: 70,
                    h: 114
                }
            },
            porta_potty_door_particle: {
                frame: {
                    w: 78,
                    h: 81,
                    x: 4003,
                    y: 2982
                },
                sourceSize: {
                    w: 78,
                    h: 81
                }
            },
            porta_potty_toilet_particle: {
                frame: {
                    w: 78,
                    h: 81,
                    x: 4003,
                    y: 3071
                },
                sourceSize: {
                    w: 78,
                    h: 81
                }
            },
            porta_potty_wall_particle: {
                frame: {
                    w: 78,
                    h: 81,
                    x: 4003,
                    y: 3160
                },
                sourceSize: {
                    w: 78,
                    h: 81
                }
            },
            ripple_particle: {
                frame: {
                    w: 91,
                    h: 91,
                    x: 4003,
                    y: 3249
                },
                sourceSize: {
                    w: 91,
                    h: 91
                }
            },
            tango_crate_particle: {
                frame: {
                    w: 75,
                    h: 75,
                    x: 4003,
                    y: 3348
                },
                sourceSize: {
                    w: 75,
                    h: 75
                }
            },
            viking_chest_particle: {
                frame: {
                    w: 78,
                    h: 81,
                    x: 4003,
                    y: 3431
                },
                sourceSize: {
                    w: 78,
                    h: 81
                }
            },
            wall_particle: {
                frame: {
                    w: 75,
                    h: 75,
                    x: 4003,
                    y: 3520
                },
                sourceSize: {
                    w: 75,
                    h: 75
                }
            },
            washing_machine_particle: {
                frame: {
                    w: 58,
                    h: 49,
                    x: 3210,
                    y: 3994
                },
                sourceSize: {
                    w: 58,
                    h: 49
                }
            },
            water_overlay: {
                frame: {
                    w: 91,
                    h: 91,
                    x: 4003,
                    y: 3603
                },
                sourceSize: {
                    w: 91,
                    h: 91
                }
            },
            proj_frag_nopin: {
                frame: {
                    w: 57,
                    h: 65,
                    x: 4003,
                    y: 3702
                },
                sourceSize: {
                    w: 57,
                    h: 65
                }
            },
            box_residue: {
                frame: {
                    w: 64,
                    h: 64,
                    x: 1212,
                    y: 3603
                },
                sourceSize: {
                    w: 64,
                    h: 64
                }
            },
            bush_residue: {
                frame: {
                    w: 100,
                    h: 100,
                    x: 1964,
                    y: 2386
                },
                sourceSize: {
                    w: 100,
                    h: 100
                }
            },
            bush_residue_winter: {
                frame: {
                    w: 100,
                    h: 100,
                    x: 1964,
                    y: 2494
                },
                sourceSize: {
                    w: 100,
                    h: 100
                }
            },
            gold_rock_residue: {
                frame: {
                    w: 94,
                    h: 85,
                    x: 1212,
                    y: 3675
                },
                sourceSize: {
                    w: 94,
                    h: 85
                }
            },
            pumpkin_residue: {
                frame: {
                    w: 100,
                    h: 100,
                    x: 1964,
                    y: 2602
                },
                sourceSize: {
                    w: 100,
                    h: 100
                }
            },
            river_rock_residue: {
                frame: {
                    w: 108,
                    h: 102,
                    x: 1964,
                    y: 2710
                },
                sourceSize: {
                    w: 108,
                    h: 102
                }
            },
            rock_residue: {
                frame: {
                    w: 100,
                    h: 100,
                    x: 1964,
                    y: 2820
                },
                sourceSize: {
                    w: 100,
                    h: 100
                }
            },
            toilet_residue: {
                frame: {
                    w: 89,
                    h: 101,
                    x: 1212,
                    y: 3768
                },
                sourceSize: {
                    w: 89,
                    h: 101
                }
            },
            viking_chest_residue: {
                frame: {
                    w: 113,
                    h: 79,
                    x: 1964,
                    y: 2928
                },
                sourceSize: {
                    w: 113,
                    h: 79
                }
            },
            "123op_base": {
                frame: {
                    w: 90,
                    h: 90,
                    x: 1212,
                    y: 3877
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            armadillo_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 3541,
                    y: 3963
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            artist_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 1826,
                    y: 3393
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            ashfall_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 1826,
                    y: 3435
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            aurora_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 1577,
                    y: 3435
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            basic_outfit_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 3276,
                    y: 3994
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            beacon_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 3318,
                    y: 3994
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            bee_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 3360,
                    y: 3994
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            bloodlust_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 3346,
                    y: 4036
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            blue_blood_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 1212,
                    y: 3975
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            blueberry_smoothie_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 1254,
                    y: 3975
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            mosin_world: {
                frame: {
                    w: 167,
                    h: 30,
                    x: 3791,
                    y: 3777
                },
                sourceSize: {
                    w: 167,
                    h: 30
                }
            }
        }
    }, {
        meta: {
            app: "vite-spritesheet-plugin",
            image: "atlases/atlas-76e81e94.png",
            scale: "1",
            size: {
                w: 4096,
                h: 4096
            }
        },
        frames: {
            oil_tanker_ship_floor_2: {
                frame: {
                    w: 2079,
                    h: 2378,
                    x: 0,
                    y: 0
                },
                sourceSize: {
                    w: 2079,
                    h: 2378
                }
            },
            port_warehouse_ceiling_red: {
                frame: {
                    w: 1219,
                    h: 2453,
                    x: 2087,
                    y: 0
                },
                sourceSize: {
                    w: 1219,
                    h: 2453
                }
            },
            refinery_ceiling: {
                frame: {
                    w: 2027,
                    h: 1486,
                    x: 0,
                    y: 2386
                },
                sourceSize: {
                    w: 2027,
                    h: 1486
                }
            },
            refinery_floor: {
                frame: {
                    w: 2027,
                    h: 1486,
                    x: 2035,
                    y: 2461
                },
                sourceSize: {
                    w: 2027,
                    h: 1486
                }
            },
            crane_base_part: {
                frame: {
                    w: 123,
                    h: 629,
                    x: 3314,
                    y: 0
                },
                sourceSize: {
                    w: 123,
                    h: 629
                }
            },
            gold_rock: {
                frame: {
                    w: 176,
                    h: 176,
                    x: 0,
                    y: 3880
                },
                sourceSize: {
                    w: 176,
                    h: 176
                }
            },
            large_drawer: {
                frame: {
                    w: 250,
                    h: 142,
                    x: 184,
                    y: 3880
                },
                sourceSize: {
                    w: 250,
                    h: 142
                }
            },
            large_refinery_barrel: {
                frame: {
                    w: 684,
                    h: 684,
                    x: 3314,
                    y: 637
                },
                sourceSize: {
                    w: 684,
                    h: 684
                }
            },
            m1117: {
                frame: {
                    w: 393,
                    h: 898,
                    x: 3314,
                    y: 1329
                },
                sourceSize: {
                    w: 393,
                    h: 898
                }
            },
            metal_shelf: {
                frame: {
                    w: 516,
                    h: 132,
                    x: 442,
                    y: 3955
                },
                sourceSize: {
                    w: 516,
                    h: 132
                }
            },
            mobile_home_bed: {
                frame: {
                    w: 142,
                    h: 321,
                    x: 3715,
                    y: 1329
                },
                sourceSize: {
                    w: 142,
                    h: 321
                }
            },
            mobile_home_sink: {
                frame: {
                    w: 190,
                    h: 152,
                    x: 3865,
                    y: 1329
                },
                sourceSize: {
                    w: 190,
                    h: 152
                }
            },
            mobile_home_stove: {
                frame: {
                    w: 138,
                    h: 145,
                    x: 966,
                    y: 3880
                },
                sourceSize: {
                    w: 138,
                    h: 145
                }
            },
            oak_tree_1: {
                frame: {
                    w: 525,
                    h: 582,
                    x: 3445,
                    y: 0
                },
                sourceSize: {
                    w: 525,
                    h: 582
                }
            },
            oak_tree_2_winter: {
                frame: {
                    w: 313,
                    h: 388,
                    x: 3715,
                    y: 1658
                },
                sourceSize: {
                    w: 313,
                    h: 388
                }
            },
            pallet: {
                frame: {
                    w: 246,
                    h: 184,
                    x: 1112,
                    y: 3880
                },
                sourceSize: {
                    w: 246,
                    h: 184
                }
            },
            pallet_winter: {
                frame: {
                    w: 230,
                    h: 172,
                    x: 1366,
                    y: 3880
                },
                sourceSize: {
                    w: 230,
                    h: 172
                }
            },
            panel_with_a_button: {
                frame: {
                    w: 228,
                    h: 160,
                    x: 3865,
                    y: 1489
                },
                sourceSize: {
                    w: 228,
                    h: 160
                }
            },
            panel_with_the_button_pressed: {
                frame: {
                    w: 228,
                    h: 160,
                    x: 1604,
                    y: 3880
                },
                sourceSize: {
                    w: 228,
                    h: 160
                }
            },
            panel_without_button: {
                frame: {
                    w: 228,
                    h: 160,
                    x: 3314,
                    y: 2235
                },
                sourceSize: {
                    w: 228,
                    h: 160
                }
            },
            panel_without_button_small: {
                frame: {
                    w: 148,
                    h: 160,
                    x: 1840,
                    y: 3880
                },
                sourceSize: {
                    w: 148,
                    h: 160
                }
            },
            port_fence_side: {
                frame: {
                    w: 177,
                    h: 177,
                    x: 3550,
                    y: 2235
                },
                sourceSize: {
                    w: 177,
                    h: 177
                }
            },
            porta_potty_sink_wall: {
                frame: {
                    w: 384,
                    h: 87,
                    x: 1996,
                    y: 3955
                },
                sourceSize: {
                    w: 384,
                    h: 87
                }
            },
            porta_potty_toilet_closed: {
                frame: {
                    w: 243,
                    h: 124,
                    x: 2388,
                    y: 3955
                },
                sourceSize: {
                    w: 243,
                    h: 124
                }
            },
            porta_potty_toilet_open: {
                frame: {
                    w: 243,
                    h: 124,
                    x: 2639,
                    y: 3955
                },
                sourceSize: {
                    w: 243,
                    h: 124
                }
            },
            regular_crate: {
                frame: {
                    w: 185,
                    h: 185,
                    x: 3735,
                    y: 2054
                },
                sourceSize: {
                    w: 185,
                    h: 185
                }
            },
            regular_crate_winter: {
                frame: {
                    w: 185,
                    h: 185,
                    x: 3735,
                    y: 2247
                },
                sourceSize: {
                    w: 185,
                    h: 185
                }
            },
            small_drawer: {
                frame: {
                    w: 125,
                    h: 142,
                    x: 3928,
                    y: 2054
                },
                sourceSize: {
                    w: 125,
                    h: 142
                }
            },
            stove: {
                frame: {
                    w: 182,
                    h: 140,
                    x: 2890,
                    y: 3955
                },
                sourceSize: {
                    w: 182,
                    h: 140
                }
            },
            super_barrel: {
                frame: {
                    w: 150,
                    h: 150,
                    x: 3928,
                    y: 2204
                },
                sourceSize: {
                    w: 150,
                    h: 150
                }
            },
            tango_crate: {
                frame: {
                    w: 309,
                    h: 126,
                    x: 3080,
                    y: 3955
                },
                sourceSize: {
                    w: 309,
                    h: 126
                }
            },
            tear_gas_crate: {
                frame: {
                    w: 183,
                    h: 127,
                    x: 3397,
                    y: 3955
                },
                sourceSize: {
                    w: 183,
                    h: 127
                }
            },
            washing_machine: {
                frame: {
                    w: 182,
                    h: 139,
                    x: 3588,
                    y: 3955
                },
                sourceSize: {
                    w: 182,
                    h: 139
                }
            },
            airdrop_particle_1: {
                frame: {
                    w: 124,
                    h: 124,
                    x: 3778,
                    y: 3955
                },
                sourceSize: {
                    w: 124,
                    h: 124
                }
            },
            airdrop_particle_1_winter: {
                frame: {
                    w: 124,
                    h: 124,
                    x: 3910,
                    y: 3955
                },
                sourceSize: {
                    w: 124,
                    h: 124
                }
            },
            garage_door_residue: {
                frame: {
                    w: 435,
                    h: 47,
                    x: 442,
                    y: 3880
                },
                sourceSize: {
                    w: 435,
                    h: 47
                }
            },
            gun_case_residue: {
                frame: {
                    w: 146,
                    h: 62,
                    x: 184,
                    y: 4030
                },
                sourceSize: {
                    w: 146,
                    h: 62
                }
            },
            mobile_home_window_residue: {
                frame: {
                    w: 259,
                    h: 40,
                    x: 1604,
                    y: 4050
                },
                sourceSize: {
                    w: 259,
                    h: 40
                }
            },
            tv_residue: {
                frame: {
                    w: 113,
                    h: 325,
                    x: 3978,
                    y: 0
                },
                sourceSize: {
                    w: 113,
                    h: 325
                }
            },
            algae_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 4006,
                    y: 333
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            aquatic_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 4006,
                    y: 431
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            arctic_camo_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 4006,
                    y: 529
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            armadillo_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 4006,
                    y: 627
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            artist_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 4006,
                    y: 725
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            ashfall_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 4006,
                    y: 823
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            aurora_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 4006,
                    y: 921
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            basic_outfit_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 4006,
                    y: 1019
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            beacon_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 4006,
                    y: 1117
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            bee_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 4006,
                    y: 1215
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            bloodlust_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 3928,
                    y: 2362
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            bubblegum_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 4061,
                    y: 1657
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            candy_cane_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 4061,
                    y: 1699
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            christmas_tree_skin_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 4061,
                    y: 1741
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            coal_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 4061,
                    y: 1783
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            desert_camo_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 4061,
                    y: 1825
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            dev_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 4061,
                    y: 1867
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            eipi_fist: {
                frame: {
                    w: 35,
                    h: 35,
                    x: 4061,
                    y: 1909
                },
                sourceSize: {
                    w: 35,
                    h: 35
                }
            },
            fireball_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 4061,
                    y: 1952
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            floral_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 4061,
                    y: 1994
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            forest_camo_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 4061,
                    y: 2036
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            full_moon_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 4061,
                    y: 2078
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            ghillie_suit_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 4061,
                    y: 2120
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            gingerbread_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 4061,
                    y: 2162
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            greenhorn_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 1366,
                    y: 4060
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            gunmetal_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 1408,
                    y: 4060
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            hasanger_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 1450,
                    y: 4060
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            hazel_jumpsuit_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 1492,
                    y: 4060
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            henrys_little_helper_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 1534,
                    y: 4060
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            katie_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 3445,
                    y: 590
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            leia_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 3487,
                    y: 590
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            limenade_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 3529,
                    y: 590
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            mango_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 3571,
                    y: 590
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            nokilpls_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 3613,
                    y: 590
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            peppermint_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 3655,
                    y: 590
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            pot_o_gold_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 3697,
                    y: 590
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            printer_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 3739,
                    y: 590
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            radians_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 3781,
                    y: 590
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            silver_lining_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 3823,
                    y: 590
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            snow_cone_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 3865,
                    y: 590
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            solar_flare_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 3907,
                    y: 590
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            spearmint_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 3949,
                    y: 590
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            stardust_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 2035,
                    y: 2386
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            stratosphere_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 1871,
                    y: 4050
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            sunny_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 1913,
                    y: 4050
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            sunrise_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 1955,
                    y: 4050
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            sunset_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 1997,
                    y: 4050
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            swiss_cheese_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 2039,
                    y: 4050
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            target_practice_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 2081,
                    y: 4050
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            tiger_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 2123,
                    y: 4050
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            toadstool_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 2165,
                    y: 4050
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            tomato_skin_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 2207,
                    y: 4050
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            twilight_zone_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 2249,
                    y: 4050
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            verified_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 2291,
                    y: 4050
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            volcanic_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 2333,
                    y: 4050
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            wave_jumpsuit_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 3314,
                    y: 2403
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            zebra_fist: {
                frame: {
                    w: 34,
                    h: 34,
                    x: 3356,
                    y: 2403
                },
                sourceSize: {
                    w: 34,
                    h: 34
                }
            },
            gas_can_world: {
                frame: {
                    w: 90,
                    h: 56,
                    x: 338,
                    y: 4030
                },
                sourceSize: {
                    w: 90,
                    h: 56
                }
            },
            radio_world: {
                frame: {
                    w: 97,
                    h: 40,
                    x: 3398,
                    y: 2403
                },
                sourceSize: {
                    w: 97,
                    h: 40
                }
            },
            smoke_grenade: {
                frame: {
                    w: 62,
                    h: 72,
                    x: 4026,
                    y: 2362
                },
                sourceSize: {
                    w: 62,
                    h: 72
                }
            },
            stoner_63_world: {
                frame: {
                    w: 129,
                    h: 37,
                    x: 966,
                    y: 4033
                },
                sourceSize: {
                    w: 129,
                    h: 37
                }
            }
        }
    }, {
        meta: {
            app: "vite-spritesheet-plugin",
            image: "atlases/atlas-851f0e24.png",
            scale: "1",
            size: {
                w: 4096,
                h: 4096
            }
        },
        frames: {
            ship_floor_1: {
                frame: {
                    w: 2026,
                    h: 2599,
                    x: 0,
                    y: 0
                },
                sourceSize: {
                    w: 2026,
                    h: 2599
                }
            },
            ship_floor_2: {
                frame: {
                    w: 2025,
                    h: 2599,
                    x: 2034,
                    y: 0
                },
                sourceSize: {
                    w: 2025,
                    h: 2599
                }
            },
            ship_tango_room_roof: {
                frame: {
                    w: 1440,
                    h: 857,
                    x: 0,
                    y: 2607
                },
                sourceSize: {
                    w: 1440,
                    h: 857
                }
            },
            christmas_tree: {
                frame: {
                    w: 1e3,
                    h: 1e3,
                    x: 1448,
                    y: 2607
                },
                sourceSize: {
                    w: 1e3,
                    h: 1e3
                }
            },
            large_oil_tank: {
                frame: {
                    w: 1116,
                    h: 1121,
                    x: 2456,
                    y: 2607
                },
                sourceSize: {
                    w: 1116,
                    h: 1121
                }
            },
            oak_tree_1_fall: {
                frame: {
                    w: 443,
                    h: 481,
                    x: 0,
                    y: 3615
                },
                sourceSize: {
                    w: 443,
                    h: 481
                }
            },
            oak_tree_1_winter: {
                frame: {
                    w: 415,
                    h: 446,
                    x: 451,
                    y: 3615
                },
                sourceSize: {
                    w: 415,
                    h: 446
                }
            },
            oak_tree_2: {
                frame: {
                    w: 521,
                    h: 550,
                    x: 874,
                    y: 3472
                },
                sourceSize: {
                    w: 521,
                    h: 550
                }
            },
            oak_tree_3_winter: {
                frame: {
                    w: 410,
                    h: 434,
                    x: 1403,
                    y: 3615
                },
                sourceSize: {
                    w: 410,
                    h: 434
                }
            },
            oil_tank: {
                frame: {
                    w: 522,
                    h: 317,
                    x: 1821,
                    y: 3736
                },
                sourceSize: {
                    w: 522,
                    h: 317
                }
            },
            oil_tank_winter: {
                frame: {
                    w: 489,
                    h: 297,
                    x: 3580,
                    y: 2607
                },
                sourceSize: {
                    w: 489,
                    h: 297
                }
            },
            river_rock_1: {
                frame: {
                    w: 283,
                    h: 278,
                    x: 2351,
                    y: 3736
                },
                sourceSize: {
                    w: 283,
                    h: 278
                }
            },
            river_rock_2: {
                frame: {
                    w: 289,
                    h: 273,
                    x: 2642,
                    y: 3736
                },
                sourceSize: {
                    w: 289,
                    h: 273
                }
            },
            river_rock_3: {
                frame: {
                    w: 297,
                    h: 288,
                    x: 2939,
                    y: 3736
                },
                sourceSize: {
                    w: 297,
                    h: 288
                }
            },
            river_rock_4: {
                frame: {
                    w: 298,
                    h: 296,
                    x: 3244,
                    y: 3736
                },
                sourceSize: {
                    w: 298,
                    h: 296
                }
            },
            river_rock_5: {
                frame: {
                    w: 307,
                    h: 279,
                    x: 3550,
                    y: 3736
                },
                sourceSize: {
                    w: 307,
                    h: 279
                }
            },
            rock_1: {
                frame: {
                    w: 175,
                    h: 175,
                    x: 3865,
                    y: 2912
                },
                sourceSize: {
                    w: 175,
                    h: 175
                }
            },
            rock_2: {
                frame: {
                    w: 175,
                    h: 175,
                    x: 3865,
                    y: 3095
                },
                sourceSize: {
                    w: 175,
                    h: 175
                }
            },
            rock_3: {
                frame: {
                    w: 175,
                    h: 175,
                    x: 3865,
                    y: 3278
                },
                sourceSize: {
                    w: 175,
                    h: 175
                }
            },
            rock_4: {
                frame: {
                    w: 175,
                    h: 175,
                    x: 3865,
                    y: 3461
                },
                sourceSize: {
                    w: 175,
                    h: 175
                }
            },
            rock_5: {
                frame: {
                    w: 175,
                    h: 175,
                    x: 3865,
                    y: 3644
                },
                sourceSize: {
                    w: 175,
                    h: 175
                }
            },
            rock_6: {
                frame: {
                    w: 198,
                    h: 178,
                    x: 3865,
                    y: 3827
                },
                sourceSize: {
                    w: 198,
                    h: 178
                }
            },
            rock_6_winter: {
                frame: {
                    w: 198,
                    h: 178,
                    x: 3580,
                    y: 2912
                },
                sourceSize: {
                    w: 198,
                    h: 178
                }
            },
            rock_7: {
                frame: {
                    w: 175,
                    h: 175,
                    x: 3580,
                    y: 3098
                },
                sourceSize: {
                    w: 175,
                    h: 175
                }
            },
            sandbags: {
                frame: {
                    w: 263,
                    h: 159,
                    x: 3580,
                    y: 3281
                },
                sourceSize: {
                    w: 263,
                    h: 159
                }
            },
            small_refinery_barrel: {
                frame: {
                    w: 271,
                    h: 271,
                    x: 3580,
                    y: 3448
                },
                sourceSize: {
                    w: 271,
                    h: 271
                }
            },
            aegis_crate_residue: {
                frame: {
                    w: 125,
                    h: 125,
                    x: 0,
                    y: 3472
                },
                sourceSize: {
                    w: 125,
                    h: 125
                }
            },
            airdrop_crate_residue: {
                frame: {
                    w: 125,
                    h: 125,
                    x: 133,
                    y: 3472
                },
                sourceSize: {
                    w: 125,
                    h: 125
                }
            },
            ammo_crate_residue: {
                frame: {
                    w: 125,
                    h: 125,
                    x: 266,
                    y: 3472
                },
                sourceSize: {
                    w: 125,
                    h: 125
                }
            },
            birch_tree_residue_fall: {
                frame: {
                    w: 146,
                    h: 135,
                    x: 399,
                    y: 3472
                },
                sourceSize: {
                    w: 146,
                    h: 135
                }
            },
            bookshelf_residue: {
                frame: {
                    w: 250,
                    h: 85,
                    x: 1821,
                    y: 3615
                },
                sourceSize: {
                    w: 250,
                    h: 85
                }
            },
            briefcase_residue: {
                frame: {
                    w: 141,
                    h: 118,
                    x: 553,
                    y: 3472
                },
                sourceSize: {
                    w: 141,
                    h: 118
                }
            },
            cabinet_residue: {
                frame: {
                    w: 219,
                    h: 68,
                    x: 3550,
                    y: 4023
                },
                sourceSize: {
                    w: 219,
                    h: 68
                }
            },
            chair_residue: {
                frame: {
                    w: 137,
                    h: 134,
                    x: 702,
                    y: 3472
                },
                sourceSize: {
                    w: 137,
                    h: 134
                }
            },
            gun_mount_residue: {
                frame: {
                    w: 220,
                    h: 74,
                    x: 2351,
                    y: 4022
                },
                sourceSize: {
                    w: 220,
                    h: 74
                }
            },
            tango_crate_residue: {
                frame: {
                    w: 235,
                    h: 100,
                    x: 2079,
                    y: 3615
                },
                sourceSize: {
                    w: 235,
                    h: 100
                }
            },
            blue_blood_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 3763,
                    y: 3098
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            blueberry_smoothie_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 2322,
                    y: 3615
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            power_cell_trail: {
                frame: {
                    w: 501,
                    h: 41,
                    x: 2579,
                    y: 4040
                },
                sourceSize: {
                    w: 501,
                    h: 41
                }
            },
            barrett_world: {
                frame: {
                    w: 191,
                    h: 38,
                    x: 874,
                    y: 4057
                },
                sourceSize: {
                    w: 191,
                    h: 38
                }
            },
            frag_grenade: {
                frame: {
                    w: 75,
                    h: 78,
                    x: 3865,
                    y: 4013
                },
                sourceSize: {
                    w: 75,
                    h: 78
                }
            },
            lewis_gun_world: {
                frame: {
                    w: 235,
                    h: 60,
                    x: 1073,
                    y: 4030
                },
                sourceSize: {
                    w: 235,
                    h: 60
                }
            },
            vector: {
                frame: {
                    w: 99,
                    h: 75,
                    x: 3948,
                    y: 4013
                },
                sourceSize: {
                    w: 99,
                    h: 75
                }
            }
        }
    }, {
        meta: {
            app: "vite-spritesheet-plugin",
            image: "atlases/atlas-68bbba15.png",
            scale: "1",
            size: {
                w: 4096,
                h: 4096
            }
        },
        frames: {
            warehouse_ceiling: {
                frame: {
                    w: 880,
                    h: 1602,
                    x: 0,
                    y: 0
                },
                sourceSize: {
                    w: 880,
                    h: 1602
                }
            },
            warehouse_floor: {
                frame: {
                    w: 827,
                    h: 1795,
                    x: 888,
                    y: 0
                },
                sourceSize: {
                    w: 827,
                    h: 1795
                }
            },
            oak_tree_2_fall: {
                frame: {
                    w: 521,
                    h: 550,
                    x: 1723,
                    y: 0
                },
                sourceSize: {
                    w: 521,
                    h: 550
                }
            },
            oak_tree_3: {
                frame: {
                    w: 550,
                    h: 531,
                    x: 1723,
                    y: 558
                },
                sourceSize: {
                    w: 550,
                    h: 531
                }
            },
            oak_tree_3_fall: {
                frame: {
                    w: 550,
                    h: 531,
                    x: 2252,
                    y: 0
                },
                sourceSize: {
                    w: 550,
                    h: 531
                }
            },
            pine_tree: {
                frame: {
                    w: 575,
                    h: 518,
                    x: 1723,
                    y: 1097
                },
                sourceSize: {
                    w: 575,
                    h: 518
                }
            },
            pine_tree_winter: {
                frame: {
                    w: 575,
                    h: 518,
                    x: 2281,
                    y: 539
                },
                sourceSize: {
                    w: 575,
                    h: 518
                }
            },
            ship_thing_1: {
                frame: {
                    w: 250,
                    h: 509,
                    x: 2810,
                    y: 0
                },
                sourceSize: {
                    w: 250,
                    h: 509
                }
            },
            small_bridge: {
                frame: {
                    w: 937,
                    h: 324,
                    x: 3068,
                    y: 0
                },
                sourceSize: {
                    w: 937,
                    h: 324
                }
            },
            smokestack: {
                frame: {
                    w: 356,
                    h: 356,
                    x: 1723,
                    y: 1623
                },
                sourceSize: {
                    w: 356,
                    h: 356
                }
            },
            table: {
                frame: {
                    w: 166,
                    h: 245,
                    x: 0,
                    y: 1803
                },
                sourceSize: {
                    w: 166,
                    h: 245
                }
            },
            toilet: {
                frame: {
                    w: 128,
                    h: 162,
                    x: 0,
                    y: 1610
                },
                sourceSize: {
                    w: 128,
                    h: 162
                }
            },
            trailer: {
                frame: {
                    w: 320,
                    h: 932,
                    x: 2306,
                    y: 1065
                },
                sourceSize: {
                    w: 320,
                    h: 932
                }
            },
            trailer_winter: {
                frame: {
                    w: 300,
                    h: 874,
                    x: 2634,
                    y: 1065
                },
                sourceSize: {
                    w: 300,
                    h: 874
                }
            },
            truck: {
                frame: {
                    w: 407,
                    h: 1058,
                    x: 2942,
                    y: 517
                },
                sourceSize: {
                    w: 407,
                    h: 1058
                }
            },
            truck_winter: {
                frame: {
                    w: 382,
                    h: 992,
                    x: 3357,
                    y: 332
                },
                sourceSize: {
                    w: 382,
                    h: 992
                }
            },
            used_toilet: {
                frame: {
                    w: 128,
                    h: 162,
                    x: 3068,
                    y: 332
                },
                sourceSize: {
                    w: 128,
                    h: 162
                }
            },
            viking_chest: {
                frame: {
                    w: 240,
                    h: 159,
                    x: 136,
                    y: 1610
                },
                sourceSize: {
                    w: 240,
                    h: 159
                }
            },
            mobile_home_particle: {
                frame: {
                    w: 140,
                    h: 199,
                    x: 174,
                    y: 1803
                },
                sourceSize: {
                    w: 140,
                    h: 199
                }
            },
            porta_potty_particle: {
                frame: {
                    w: 140,
                    h: 199,
                    x: 322,
                    y: 1803
                },
                sourceSize: {
                    w: 140,
                    h: 199
                }
            },
            radio_wave: {
                frame: {
                    w: 158,
                    h: 222,
                    x: 470,
                    y: 1803
                },
                sourceSize: {
                    w: 158,
                    h: 222
                }
            },
            smoke_grenade_particle: {
                frame: {
                    w: 221,
                    h: 221,
                    x: 636,
                    y: 1610
                },
                sourceSize: {
                    w: 221,
                    h: 221
                }
            },
            death_marker: {
                frame: {
                    w: 154,
                    h: 154,
                    x: 384,
                    y: 1610
                },
                sourceSize: {
                    w: 154,
                    h: 154
                }
            },
            player_indicator: {
                frame: {
                    w: 200,
                    h: 200,
                    x: 636,
                    y: 1839
                },
                sourceSize: {
                    w: 200,
                    h: 200
                }
            },
            player_indicator_dead: {
                frame: {
                    w: 200,
                    h: 200,
                    x: 844,
                    y: 1839
                },
                sourceSize: {
                    w: 200,
                    h: 200
                }
            },
            airdrop_crate_residue_winter: {
                frame: {
                    w: 229,
                    h: 217,
                    x: 1052,
                    y: 1803
                },
                sourceSize: {
                    w: 229,
                    h: 217
                }
            },
            barrel_residue: {
                frame: {
                    w: 175,
                    h: 175,
                    x: 2087,
                    y: 1623
                },
                sourceSize: {
                    w: 175,
                    h: 175
                }
            },
            bed_residue: {
                frame: {
                    w: 224,
                    h: 321,
                    x: 3747,
                    y: 332
                },
                sourceSize: {
                    w: 224,
                    h: 321
                }
            },
            birch_tree_residue: {
                frame: {
                    w: 239,
                    h: 218,
                    x: 1289,
                    y: 1803
                },
                sourceSize: {
                    w: 239,
                    h: 218
                }
            },
            birch_tree_residue_winter: {
                frame: {
                    w: 239,
                    h: 218,
                    x: 3747,
                    y: 661
                },
                sourceSize: {
                    w: 239,
                    h: 218
                }
            },
            christmas_tree_residue: {
                frame: {
                    w: 352,
                    h: 323,
                    x: 2942,
                    y: 1583
                },
                sourceSize: {
                    w: 352,
                    h: 323
                }
            },
            couch_residue: {
                frame: {
                    w: 148,
                    h: 317,
                    x: 3302,
                    y: 1583
                },
                sourceSize: {
                    w: 148,
                    h: 317
                }
            },
            flint_crate_residue: {
                frame: {
                    w: 125,
                    h: 125,
                    x: 2942,
                    y: 1914
                },
                sourceSize: {
                    w: 125,
                    h: 125
                }
            },
            flint_stone_residue: {
                frame: {
                    w: 125,
                    h: 125,
                    x: 3075,
                    y: 1914
                },
                sourceSize: {
                    w: 125,
                    h: 125
                }
            },
            fridge_residue: {
                frame: {
                    w: 182,
                    h: 138,
                    x: 3302,
                    y: 1908
                },
                sourceSize: {
                    w: 182,
                    h: 138
                }
            },
            gold_airdrop_crate_residue: {
                frame: {
                    w: 125,
                    h: 125,
                    x: 3204,
                    y: 332
                },
                sourceSize: {
                    w: 125,
                    h: 125
                }
            },
            gold_airdrop_crate_residue_winter: {
                frame: {
                    w: 229,
                    h: 217,
                    x: 3357,
                    y: 1332
                },
                sourceSize: {
                    w: 229,
                    h: 217
                }
            },
            grenade_crate_residue: {
                frame: {
                    w: 125,
                    h: 125,
                    x: 1536,
                    y: 1803
                },
                sourceSize: {
                    w: 125,
                    h: 125
                }
            },
            large_drawer_residue: {
                frame: {
                    w: 250,
                    h: 125,
                    x: 3747,
                    y: 887
                },
                sourceSize: {
                    w: 250,
                    h: 125
                }
            },
            large_refinery_barrel_residue: {
                frame: {
                    w: 400,
                    h: 388,
                    x: 3594,
                    y: 1332
                },
                sourceSize: {
                    w: 400,
                    h: 388
                }
            },
            mobile_home_bed_residue: {
                frame: {
                    w: 142,
                    h: 321,
                    x: 1536,
                    y: 1936
                },
                sourceSize: {
                    w: 142,
                    h: 321
                }
            },
            mobile_home_sink_residue: {
                frame: {
                    w: 190,
                    h: 152,
                    x: 3458,
                    y: 1728
                },
                sourceSize: {
                    w: 190,
                    h: 152
                }
            },
            oak_tree_residue: {
                frame: {
                    w: 237,
                    h: 218,
                    x: 174,
                    y: 2010
                },
                sourceSize: {
                    w: 237,
                    h: 218
                }
            },
            oak_tree_residue_fall: {
                frame: {
                    w: 240,
                    h: 240,
                    x: 2634,
                    y: 1947
                },
                sourceSize: {
                    w: 240,
                    h: 240
                }
            },
            oak_tree_residue_winter: {
                frame: {
                    w: 237,
                    h: 218,
                    x: 3747,
                    y: 1020
                },
                sourceSize: {
                    w: 237,
                    h: 218
                }
            },
            pine_tree_residue: {
                frame: {
                    w: 237,
                    h: 218,
                    x: 2882,
                    y: 2047
                },
                sourceSize: {
                    w: 237,
                    h: 218
                }
            },
            porta_potty_toilet_residue: {
                frame: {
                    w: 223,
                    h: 131,
                    x: 1052,
                    y: 2028
                },
                sourceSize: {
                    w: 223,
                    h: 131
                }
            },
            regular_crate_residue: {
                frame: {
                    w: 125,
                    h: 125,
                    x: 3458,
                    y: 1557
                },
                sourceSize: {
                    w: 125,
                    h: 125
                }
            },
            small_drawer_residue: {
                frame: {
                    w: 125,
                    h: 125,
                    x: 0,
                    y: 2056
                },
                sourceSize: {
                    w: 125,
                    h: 125
                }
            },
            stove_residue: {
                frame: {
                    w: 175,
                    h: 175,
                    x: 419,
                    y: 2033
                },
                sourceSize: {
                    w: 175,
                    h: 175
                }
            },
            super_barrel_residue: {
                frame: {
                    w: 175,
                    h: 175,
                    x: 2087,
                    y: 1806
                },
                sourceSize: {
                    w: 175,
                    h: 175
                }
            },
            table_residue: {
                frame: {
                    w: 166,
                    h: 245,
                    x: 0,
                    y: 2189
                },
                sourceSize: {
                    w: 166,
                    h: 245
                }
            },
            washing_machine_residue: {
                frame: {
                    w: 182,
                    h: 139,
                    x: 1283,
                    y: 2029
                },
                sourceSize: {
                    w: 182,
                    h: 139
                }
            },
            bubblegum_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 4005,
                    y: 332
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            candy_cane_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 4005,
                    y: 430
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            christmas_tree_skin_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 4005,
                    y: 528
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            coal_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 4005,
                    y: 626
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            desert_camo_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 4005,
                    y: 724
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            dev_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 4005,
                    y: 822
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            eipi_base: {
                frame: {
                    w: 91,
                    h: 91,
                    x: 4005,
                    y: 920
                },
                sourceSize: {
                    w: 91,
                    h: 91
                }
            },
            fireball_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 4005,
                    y: 1019
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            floral_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 4002,
                    y: 1117
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            forest_camo_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 4002,
                    y: 1215
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            full_moon_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 4002,
                    y: 1313
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            ghillie_suit_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 4002,
                    y: 1411
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            gingerbread_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 4002,
                    y: 1509
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            greenhorn_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 4002,
                    y: 1607
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            gunmetal_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 4002,
                    y: 1705
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            hasanger_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 3127,
                    y: 2047
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            hazel_jumpsuit_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 3656,
                    y: 1728
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            henrys_little_helper_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 3754,
                    y: 1728
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            katie_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 3852,
                    y: 1728
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            leia_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 3950,
                    y: 1803
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            limenade_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 3656,
                    y: 1826
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            mango_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 3492,
                    y: 1888
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            nokilpls_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 3754,
                    y: 1826
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            peppermint_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 3852,
                    y: 1826
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            pot_o_gold_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 3950,
                    y: 1901
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            printer_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 3590,
                    y: 1924
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            radians_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 3492,
                    y: 1986
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            silver_lining_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 3688,
                    y: 1924
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            snow_cone_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 3786,
                    y: 1924
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            solar_flare_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 3884,
                    y: 1999
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            spearmint_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 3982,
                    y: 1999
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            stardust_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 3225,
                    y: 2054
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            stratosphere_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 3127,
                    y: 2145
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            sunny_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 3323,
                    y: 2054
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            sunrise_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 3590,
                    y: 2022
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            sunset_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 3421,
                    y: 2084
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            swiss_cheese_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 3688,
                    y: 2022
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            target_practice_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 3786,
                    y: 2022
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            tiger_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 3225,
                    y: 2152
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            toadstool_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 3127,
                    y: 2243
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            tomato_skin_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 3323,
                    y: 2152
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            twilight_zone_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 3884,
                    y: 2097
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            verified_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 3982,
                    y: 2097
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            volcanic_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 3519,
                    y: 2120
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            wave_jumpsuit_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 3421,
                    y: 2182
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            zebra_base: {
                frame: {
                    w: 90,
                    h: 90,
                    x: 3225,
                    y: 2250
                },
                sourceSize: {
                    w: 90,
                    h: 90
                }
            },
            acr: {
                frame: {
                    w: 110,
                    h: 110,
                    x: 3617,
                    y: 2120
                },
                sourceSize: {
                    w: 110,
                    h: 110
                }
            },
            ak47: {
                frame: {
                    w: 110,
                    h: 110,
                    x: 3735,
                    y: 2120
                },
                sourceSize: {
                    w: 110,
                    h: 110
                }
            },
            arx160: {
                frame: {
                    w: 110,
                    h: 110,
                    x: 3853,
                    y: 2195
                },
                sourceSize: {
                    w: 110,
                    h: 110
                }
            },
            aug: {
                frame: {
                    w: 110,
                    h: 110,
                    x: 3971,
                    y: 2195
                },
                sourceSize: {
                    w: 110,
                    h: 110
                }
            },
            barrett: {
                frame: {
                    w: 110,
                    h: 110,
                    x: 3519,
                    y: 2238
                },
                sourceSize: {
                    w: 110,
                    h: 110
                }
            },
            baseball_bat: {
                frame: {
                    w: 140,
                    h: 140,
                    x: 3323,
                    y: 2280
                },
                sourceSize: {
                    w: 140,
                    h: 140
                }
            },
            cz75a: {
                frame: {
                    w: 110,
                    h: 110,
                    x: 3637,
                    y: 2238
                },
                sourceSize: {
                    w: 110,
                    h: 110
                }
            },
            deathray: {
                frame: {
                    w: 110,
                    h: 110,
                    x: 3755,
                    y: 2313
                },
                sourceSize: {
                    w: 110,
                    h: 110
                }
            },
            dual_cz75a: {
                frame: {
                    w: 110,
                    h: 110,
                    x: 3873,
                    y: 2313
                },
                sourceSize: {
                    w: 110,
                    h: 110
                }
            },
            dual_g19: {
                frame: {
                    w: 110,
                    h: 110,
                    x: 3471,
                    y: 2356
                },
                sourceSize: {
                    w: 110,
                    h: 110
                }
            },
            dual_m1895: {
                frame: {
                    w: 110,
                    h: 110,
                    x: 3589,
                    y: 2356
                },
                sourceSize: {
                    w: 110,
                    h: 110
                }
            },
            dual_s_g17: {
                frame: {
                    w: 110,
                    h: 110,
                    x: 3707,
                    y: 2431
                },
                sourceSize: {
                    w: 110,
                    h: 110
                }
            },
            fists: {
                frame: {
                    w: 110,
                    h: 110,
                    x: 3825,
                    y: 2431
                },
                sourceSize: {
                    w: 110,
                    h: 110
                }
            },
            flues: {
                frame: {
                    w: 110,
                    h: 110,
                    x: 3943,
                    y: 2431
                },
                sourceSize: {
                    w: 110,
                    h: 110
                }
            },
            g19: {
                frame: {
                    w: 110,
                    h: 110,
                    x: 1686,
                    y: 1987
                },
                sourceSize: {
                    w: 110,
                    h: 110
                }
            },
            gas_can: {
                frame: {
                    w: 110,
                    h: 110,
                    x: 1804,
                    y: 1987
                },
                sourceSize: {
                    w: 110,
                    h: 110
                }
            },
            heap_sword: {
                frame: {
                    w: 110,
                    h: 110,
                    x: 1922,
                    y: 1987
                },
                sourceSize: {
                    w: 110,
                    h: 110
                }
            },
            hp18: {
                frame: {
                    w: 110,
                    h: 110,
                    x: 2040,
                    y: 1989
                },
                sourceSize: {
                    w: 110,
                    h: 110
                }
            },
            ice_pick: {
                frame: {
                    w: 137,
                    h: 137,
                    x: 2158,
                    y: 1989
                },
                sourceSize: {
                    w: 137,
                    h: 137
                }
            },
            kbar: {
                frame: {
                    w: 104,
                    h: 96,
                    x: 3991,
                    y: 2313
                },
                sourceSize: {
                    w: 104,
                    h: 96
                }
            },
            lewis_gun: {
                frame: {
                    w: 110,
                    h: 110,
                    x: 2303,
                    y: 2005
                },
                sourceSize: {
                    w: 110,
                    h: 110
                }
            },
            m16a4: {
                frame: {
                    w: 110,
                    h: 110,
                    x: 2421,
                    y: 2005
                },
                sourceSize: {
                    w: 110,
                    h: 110
                }
            },
            m1895: {
                frame: {
                    w: 110,
                    h: 110,
                    x: 2303,
                    y: 2123
                },
                sourceSize: {
                    w: 110,
                    h: 110
                }
            },
            m1_garand: {
                frame: {
                    w: 110,
                    h: 110,
                    x: 2421,
                    y: 2123
                },
                sourceSize: {
                    w: 110,
                    h: 110
                }
            },
            m3k: {
                frame: {
                    w: 110,
                    h: 110,
                    x: 2539,
                    y: 2195
                },
                sourceSize: {
                    w: 110,
                    h: 110
                }
            },
            maul: {
                frame: {
                    w: 135,
                    h: 131,
                    x: 2657,
                    y: 2195
                },
                sourceSize: {
                    w: 135,
                    h: 131
                }
            },
            mcx_spear: {
                frame: {
                    w: 110,
                    h: 110,
                    x: 2800,
                    y: 2273
                },
                sourceSize: {
                    w: 110,
                    h: 110
                }
            },
            micro_uzi: {
                frame: {
                    w: 110,
                    h: 110,
                    x: 2918,
                    y: 2273
                },
                sourceSize: {
                    w: 110,
                    h: 110
                }
            },
            mini14: {
                frame: {
                    w: 110,
                    h: 110,
                    x: 3036,
                    y: 2341
                },
                sourceSize: {
                    w: 110,
                    h: 110
                }
            },
            model_37: {
                frame: {
                    w: 110,
                    h: 110,
                    x: 3154,
                    y: 2348
                },
                sourceSize: {
                    w: 110,
                    h: 110
                }
            },
            mosin: {
                frame: {
                    w: 110,
                    h: 110,
                    x: 3272,
                    y: 2428
                },
                sourceSize: {
                    w: 110,
                    h: 110
                }
            },
            mp40: {
                frame: {
                    w: 110,
                    h: 110,
                    x: 3390,
                    y: 2474
                },
                sourceSize: {
                    w: 110,
                    h: 110
                }
            },
            radio: {
                frame: {
                    w: 110,
                    h: 110,
                    x: 3508,
                    y: 2474
                },
                sourceSize: {
                    w: 110,
                    h: 110
                }
            },
            revitalizer: {
                frame: {
                    w: 110,
                    h: 110,
                    x: 1686,
                    y: 2105
                },
                sourceSize: {
                    w: 110,
                    h: 110
                }
            },
            s_g17: {
                frame: {
                    w: 109,
                    h: 107,
                    x: 1804,
                    y: 2105
                },
                sourceSize: {
                    w: 109,
                    h: 107
                }
            },
            saf_200: {
                frame: {
                    w: 110,
                    h: 110,
                    x: 1921,
                    y: 2105
                },
                sourceSize: {
                    w: 110,
                    h: 110
                }
            },
            seax: {
                frame: {
                    w: 104,
                    h: 118,
                    x: 1804,
                    y: 2220
                },
                sourceSize: {
                    w: 104,
                    h: 118
                }
            },
            sr25: {
                frame: {
                    w: 110,
                    h: 110,
                    x: 1686,
                    y: 2223
                },
                sourceSize: {
                    w: 110,
                    h: 110
                }
            },
            stoner_63: {
                frame: {
                    w: 110,
                    h: 110,
                    x: 2039,
                    y: 2107
                },
                sourceSize: {
                    w: 110,
                    h: 110
                }
            },
            tango_51: {
                frame: {
                    w: 110,
                    h: 110,
                    x: 1916,
                    y: 2223
                },
                sourceSize: {
                    w: 110,
                    h: 110
                }
            },
            usas12: {
                frame: {
                    w: 110,
                    h: 110,
                    x: 2157,
                    y: 2134
                },
                sourceSize: {
                    w: 110,
                    h: 110
                }
            },
            vepr12: {
                frame: {
                    w: 110,
                    h: 110,
                    x: 2034,
                    y: 2225
                },
                sourceSize: {
                    w: 110,
                    h: 110
                }
            },
            vss: {
                frame: {
                    w: 110,
                    h: 110,
                    x: 1916,
                    y: 2341
                },
                sourceSize: {
                    w: 110,
                    h: 110
                }
            }
        }
    }],
    xt = {};
async function sa() {
    const a = [];
    for (const t of na) {
        const i = t.meta.image;
        console.log(`Loading atlas ${location.origin}/${i}`), a.push(new Promise(o => {
            Rt.fromURL(i).then(r => {
                new Pi(r, t).parse().then(n => {
                    for (const c in n) xt[c] = n[c];
                    console.log(`Atlas ${i} loaded.`), o()
                }).catch(console.error)
            }).catch(console.error)
        }))
    }
    await Promise.all(a)
}
class O extends Tt {
    constructor(t) {
        super(t ? O._getTexture(t) : void 0), this.anchor.set(.5), this.setPos(0, 0)
    }
    static _getTexture(t) {
        var i;
        return we.reskin && ((i = fi[we.reskin]) != null && i.textures.includes(t)) && (t += `_${we.reskin}`), xt[t] ?? xt._missing_texture
    }
    setFrame(t) {
        return this.texture = O._getTexture(t), this
    }
    setAnchor(t) {
        return this.anchor.copyFrom(t), this
    }
    setPos(t, i) {
        return this.position.set(t, i), this
    }
    setVPos(t) {
        return this.position.set(t.x, t.y), this
    }
    setVisible(t) {
        return this.visible = t, this
    }
    setAngle(t) {
        return this.angle = t ?? 0, this
    }
    setRotation(t) {
        return this.rotation = t ?? 0, this
    }
    setScale(t) {
        return this.scale = e.create(t ?? 1, t ?? 1), this
    }
    setTint(t) {
        return this.tint = t, this
    }
    setZIndex(t) {
        return this.zIndex = t, this
    }
    setAlpha(t) {
        return this.alpha = t, this
    }
}

function K(a) {
    return e.scale(a, N)
}
const _e = {
    grass: {
        debugColor: 21760
    },
    stone: {
        debugColor: 1184274
    },
    wood: {
        debugColor: 8344832
    },
    sand: {
        debugColor: 16733440
    },
    metal: {
        debugColor: 8421504
    },
    water: {
        debugColor: 56831,
        speedMultiplier: .7,
        overlay: !0,
        particles: !0
    }
};
class ni {
    constructor(t, i, o, r, n, c) {
        s(this, "width");
        s(this, "height");
        s(this, "cellSize", 64);
        s(this, "floors", new Map);
        s(this, "rivers");
        s(this, "beachHitbox");
        s(this, "grassHitbox");
        s(this, "groundRect");
        s(this, "_grid", []);
        this.width = Math.floor(t / this.cellSize), this.height = Math.floor(i / this.cellSize);
        for (let S = 0; S <= this.width; S++) {
            this._grid[S] = [];
            for (let v = 0; v <= this.height; v++) this._grid[S][v] = {
                rivers: [],
                floors: []
            }
        }
        const h = o + r,
            g = new Vi(n),
            u = 16,
            f = 8,
            x = this.groundRect = new l(e.create(o, o), e.create(t - o, i - o)),
            y = new l(e.create(h, h), e.create(t - h, i - h));
        this.beachHitbox = new ke(ci(x, u, f, g)), this.grassHitbox = new ke(ci(y, u, f, g)), this.rivers = c;
        for (const S of c) {
            const v = S.bankHitbox.toRectangle(),
                T = this._roundToCells(v.min),
                z = this._roundToCells(v.max);
            for (let _ = T.x; _ <= z.x; _++)
                for (let I = T.y; I <= z.y; I++) {
                    const w = e.create(_ * this.cellSize, I * this.cellSize),
                        m = new l(w, e.add(w, e.create(this.cellSize, this.cellSize)));
                    S.bankHitbox.collidesWith(m) && this._grid[_][I].rivers.push(S)
                }
        }
    }
    addFloor(t, i) {
        this.floors.set(i, t);
        const o = i.toRectangle(),
            r = this._roundToCells(o.min),
            n = this._roundToCells(o.max);
        for (let c = r.x; c <= n.x; c++)
            for (let h = r.y; h <= n.y; h++) this._grid[c][h].floors.push({
                type: t,
                hitbox: i
            })
    }
    getFloor(t) {
        const i = this._roundToCells(t);
        let o = "water";
        const r = this.beachHitbox.isPointInside(t);
        r && (o = "sand", this.grassHitbox.isPointInside(t) && (o = "grass"));
        const n = this._grid[i.x][i.y];
        if (r) {
            for (const c of n.rivers)
                if (c.bankHitbox.isPointInside(t) && (o = "sand"), c.waterHitbox.isPointInside(t)) {
                    o = "water";
                    break
                }
        }
        for (const c of n.floors)
            if (c.hitbox.isPointInside(t)) return c.type;
        return o
    }
    getRiversInPosition(t) {
        const i = this._roundToCells(t);
        return this._grid[i.x][i.y].rivers
    }
    getRiversInHitbox(t) {
        const i = new Set,
            o = t.toRectangle(),
            r = this._roundToCells(o.min),
            n = this._roundToCells(o.max);
        for (let c = r.x; c <= n.x; c++)
            for (let h = r.y; h <= n.y; h++)
                for (const g of this._grid[c][h].rivers) i.add(g);
        return [...i]
    }
    _roundToCells(t) {
        return e.create(E.clamp(Math.floor(t.x / this.cellSize), 0, this.width), E.clamp(Math.floor(t.y / this.cellSize), 0, this.height))
    }
}

function si(a, t, i, o, r) {
    return .5 * (-t + o + 2 * a * (2 * t - 5 * i + 4 * o - r) + 3 * a * a * (-t + 3 * i - 3 * o + r))
}

function li(a, t, i, o, r) {
    return .5 * (2 * i + a * (-t + o) + a * a * (2 * t - 5 * i + 4 * o - r) + a * a * a * (-t + 3 * i - 3 * o + r))
}
class la {
    constructor(t, i, o, r) {
        s(this, "width");
        s(this, "bankWidth");
        s(this, "points");
        s(this, "waterHitbox");
        s(this, "bankHitbox");
        this.width = t, this.points = i;
        const n = this.points.length - 1;
        this.bankWidth = E.clamp(this.width * .75, 12, 20);
        const c = new Array(n * 2),
            h = new Array(n * 2),
            g = !r.isPointInside(this.points[this.points.length - 1]);
        for (let u = 0; u < this.points.length; u++) {
            const f = this.points[u],
                x = this.getNormal(u / n);
            let y = this.bankWidth,
                S = null;
            for (const le of o) {
                const ue = e.length(e.sub(le.getPosition(le.getClosestT(f)), f));
                ue < le.width * 2 && (y = Math.max(y, le.bankWidth)), (u === 0 || u === this.points.length - 1) && ue < 48 && (S = le)
            }
            let v = this.width;
            const T = 2 * (Math.max(1 - u / n, u / n) - .5);
            (u < this.points.length / 2 || g) && (v = (1 + T ** 3 * 1.5) * this.width);
            const z = (le, ue, Ve) => {
                    const Ye = e.add(le, ue);
                    if (!Ve.isPointInside(Ye)) {
                        const Ee = it.rayIntersectsPolygon(le, ue, Ve.points);
                        if (Ee) return e.scale(ue, Ee)
                    }
                    return ue
                },
                _ = v + y;
            let I = e.scale(x, v),
                w = e.scale(x, -v),
                m = e.scale(x, _),
                k = e.scale(x, -_);
            S && (I = z(f, I, S.waterHitbox), w = z(f, w, S.waterHitbox), m = z(f, m, S.bankHitbox), k = z(f, k, S.bankHitbox));
            const M = e.add(f, I),
                A = e.add(f, w);
            c[u] = M, c[this.points.length + n - u] = A;
            const q = e.add(f, m),
                ee = e.add(f, k);
            h[u] = q, h[this.points.length + n - u] = ee
        }
        this.waterHitbox = new ke(c), this.bankHitbox = new ke(h)
    }
    getControlPoints(t) {
        const i = this.points.length;
        t = E.clamp(t, 0, 1);
        const o = ~~(t * (i - 1)),
            r = o === i - 1 ? o - 1 : o,
            n = r + 1,
            c = r > 0 ? r - 1 : r,
            h = n < i - 1 ? n + 1 : n;
        return {
            pt: t * (i - 1) - r,
            p0: this.points[c],
            p1: this.points[r],
            p2: this.points[n],
            p3: this.points[h]
        }
    }
    getTangent(t) {
        const {
            pt: i,
            p0: o,
            p1: r,
            p2: n,
            p3: c
        } = this.getControlPoints(t);
        return {
            x: si(i, o.x, r.x, n.x, c.x),
            y: si(i, o.y, r.y, n.y, c.y)
        }
    }
    getNormal(t) {
        const i = this.getTangent(t),
            o = e.normalizeSafe(i, e.create(1, 0));
        return e.create(-o.y, o.x)
    }
    getPosition(t) {
        const {
            pt: i,
            p0: o,
            p1: r,
            p2: n,
            p3: c
        } = this.getControlPoints(t);
        return {
            x: li(i, o.x, r.x, n.x, c.x),
            y: li(i, o.y, r.y, n.y, c.y)
        }
    }
    getClosestT(t) {
        let i = Number.MAX_VALUE,
            o = 0;
        for (let I = 0; I < this.points.length - 1; I++) {
            const w = it.distanceToLine(t, this.points[I], this.points[I + 1]);
            w < i && (i = w, o = I)
        }
        const r = o,
            n = r + 1,
            c = this.points[r],
            h = this.points[n],
            g = e.sub(h, c),
            u = E.clamp(e.dotProduct(e.sub(t, c), g) / e.dotProduct(g, g), 0, 1),
            f = this.points.length - 1,
            x = E.clamp((r + u - .1) / f, 0, 1),
            y = E.clamp((r + u + .1) / f, 0, 1);
        let S = (r + u) / f,
            v = Number.MAX_VALUE;
        const T = 8;
        for (let I = 0; I <= T; I++) {
            const w = E.lerp(I / T, x, y),
                m = this.getPosition(w),
                k = e.squaredLength(e.sub(m, t));
            k < v && (S = w, v = k)
        }
        const z = this.getTangent(S),
            _ = e.length(z);
        if (_ > 0) {
            const I = this.getPosition(S),
                w = e.dotProduct(z, e.sub(t, I)) / _,
                m = S + w / (_ * f);
            e.squaredLength(e.sub(t, this.getPosition(m))) < e.squaredLength(e.sub(t, I)) && (S = m)
        }
        return S
    }
}

function ci(a, t, i, o) {
    const r = e.clone(a.min),
        n = e.create(a.max.x, a.min.y),
        c = e.clone(a.max),
        h = e.create(a.min.x, a.max.y),
        g = [];
    i = i / 2;
    const u = () => o.get(-i, i);
    for (let f = r.x + t; f < n.x; f += t) g.push(e.create(f, r.y + u()));
    for (let f = n.y + t; f < c.y; f += t) g.push(e.create(n.x + u(), f));
    for (let f = c.x - t; f > h.x; f -= t) g.push(e.create(f, c.y + u()));
    for (let f = h.y - t; f > r.y; f -= t) g.push(e.create(h.x + u(), f));
    return g
}
Ie.disableAutoPause = !0;
class ca {
    constructor(t, i, o) {
        s(this, "manager");
        s(this, "name");
        s(this, "position");
        s(this, "fallOff");
        s(this, "maxRange");
        s(this, "onEnd");
        s(this, "dynamic");
        s(this, "instance");
        s(this, "stereoFilter");
        s(this, "ended", !1);
        if (this.name = t, this.manager = o, this.position = i.position, this.fallOff = i.falloff, this.maxRange = i.maxRange, this.dynamic = i.dynamic, this.onEnd = i.onEnd, this.stereoFilter = new Ci(0), !Ie.exists(t)) {
            console.warn(`Unknown sound with name ${t}`);
            return
        }
        const r = Ie.play(t, {
            loaded: (n, c, h) => {
                h && this.init(h)
            },
            filters: [this.stereoFilter],
            loop: i.loop,
            volume: this.manager.volume
        });
        r instanceof Promise || this.init(r)
    }
    init(t) {
        this.instance = t, t.on("end", () => {
            var i;
            (i = this.onEnd) == null || i.call(this), this.ended = !0
        }), t.on("stop", () => {
            this.ended = !0
        }), this.update()
    }
    update() {
        if (this.instance && this.position) {
            const t = e.sub(this.manager.position, this.position);
            this.instance.volume = (1 - E.clamp(Math.abs(e.length(t) / this.maxRange), 0, 1)) ** (1 + this.fallOff * 2) * this.manager.volume, this.stereoFilter.pan = E.clamp(t.x / this.maxRange * -1, -1, 1)
        }
    }
    stop() {
        var t;
        this.ended || ((t = this.instance) == null || t.stop(), this.ended = !0)
    }
}
class ha {
    constructor(t) {
        s(this, "game");
        s(this, "dynamicSounds", new Set);
        s(this, "volume");
        s(this, "position", e.create(0, 0));
        this.game = t, this.volume = t.console.getBuiltInCVar("cv_sfx_volume"), this.loadSounds()
    }
    play(t, i) {
        const o = new ca(t, {
            falloff: 1,
            maxRange: 256,
            dynamic: !1,
            loop: !1,
            ...i
        }, this);
        return o.dynamic && this.dynamicSounds.add(o), o
    }
    update() {
        for (const t of this.dynamicSounds) {
            if (t.ended) {
                this.dynamicSounds.delete(t);
                continue
            }
            t.update()
        }
    }
    stopAll() {
        Ie.stopAll()
    }
    loadSounds() {
        var i, o;
        const t = {
            player_hit_1: "audio/sfx/hits/player_hit_1",
            player_hit_2: "audio/sfx/hits/player_hit_2",
            gun_click: "audio/sfx/gun_click",
            swing: "audio/sfx/swing",
            emote: "audio/sfx/emote",
            door_open: "audio/sfx/door_open",
            door_close: "audio/sfx/door_close",
            vault_door_open: "audio/sfx/vault_door_open",
            airdrop_crate_open: "audio/sfx/airdrop_crate_open",
            generator_starting: "audio/sfx/generator_starting",
            generator_running: "audio/sfx/generator_running",
            ceiling_collapse: "audio/sfx/ceiling_collapse",
            pickup: "audio/sfx/pickup/pickup",
            ammo_pickup: "audio/sfx/pickup/ammo_pickup",
            scope_pickup: "audio/sfx/pickup/scope_pickup",
            helmet_pickup: "audio/sfx/pickup/helmet_pickup",
            vest_pickup: "audio/sfx/pickup/vest_pickup",
            backpack_pickup: "audio/sfx/pickup/backpack_pickup",
            gauze_pickup: "audio/sfx/pickup/gauze_pickup",
            medikit_pickup: "audio/sfx/pickup/medikit_pickup",
            cola_pickup: "audio/sfx/pickup/cola_pickup",
            tablets_pickup: "audio/sfx/pickup/tablets_pickup",
            throwable_pickup: "audio/sfx/pickup/throwable_pickup",
            usas_explosion: "audio/sfx/usas_explosion",
            kill_leader_assigned: "audio/sfx/kill_leader_assigned",
            kill_leader_dead: "audio/sfx/kill_leader_dead",
            airdrop_ping: "audio/sfx/airdrop/airdrop_ping",
            airdrop_plane: "audio/sfx/airdrop/airdrop_plane",
            airdrop_fall: "audio/sfx/airdrop/airdrop_fall",
            airdrop_unlock: "audio/sfx/airdrop/airdrop_unlock",
            airdrop_land: "audio/sfx/airdrop/airdrop_land",
            airdrop_land_water: "audio/sfx/airdrop/airdrop_land_water",
            throwable_pin: "audio/sfx/throwable_pin",
            throwable_throw: "audio/sfx/throwable_throw",
            frag_grenade: "audio/sfx/frag_grenade",
            smoke_grenade: "audio/sfx/smoke_grenade",
            button_press: "audio/sfx/button_press",
            puzzle_error: "audio/sfx/puzzle_error",
            puzzle_solved: "audio/sfx/puzzle_solved"
        };
        for (const r of qi) t[`${r}_hit_1`] = `audio/sfx/hits/${r}_hit_1`, t[`${r}_hit_2`] = `audio/sfx/hits/${r}_hit_2`, t[`${r}_destroyed`] = `audio/sfx/hits/${r}_destroyed`;
        for (const r of Dt) r.isDual || (t[`${r.idString}_fire`] = `audio/sfx/weapons/${r.idString}_fire`, t[`${r.idString}_switch`] = `audio/sfx/weapons/${r.idString}_switch`), t[`${r.idString}_reload`] = `audio/sfx/weapons/${r.idString}_reload`, r.ballistics.lastShotFX && (t[`${r.idString}_last_shot`] = `audio/sfx/weapons/${r.idString}_last_shot`);
        for (const r of Oe) t[`${r.idString}_switch`] = `audio/sfx/weapons/${r.idString}_switch`;
        for (const r of Ke) t[r.idString] = `audio/sfx/healing/${r.idString}`;
        for (const r in _e) t[`${r}_step_1`] = `audio/sfx/footsteps/${r}_1`, t[`${r}_step_2`] = `audio/sfx/footsteps/${r}_2`;
        for (const r in t) {
            let n = t[r];
            we.reskin && ((o = (i = fi[we.reskin]) == null ? void 0 : i.sounds) != null && o.includes(r)) && (n += `_${we.reskin}`), t[r] = `./${n}.mp3`
        }
        for (const [r, n] of Object.entries(t)) {
            let c = !1;
            Ie.add(r, {
                url: n,
                preload: !0,
                loaded(h) {
                    h !== null && !c && (c = !0, console.warn(`Failed to load sound '${r}' (path '${n}')
Error object provided below`), console.error(h))
                }
            })
        }
    }
}
class V {
    constructor(t, i) {
        s(this, "game");
        s(this, "startTime", Date.now());
        s(this, "endTime");
        s(this, "target");
        s(this, "duration");
        s(this, "startValues", {});
        s(this, "endValues", {});
        s(this, "ease");
        s(this, "yoyo");
        s(this, "onUpdate");
        s(this, "onComplete");
        s(this, "dead", !1);
        this.game = t, this.target = i.target;
        for (const o in i.to) this.startValues[o] = i.target[o], this.endValues[o] = i.to[o];
        this.duration = i.duration, this.ease = i.ease, this.yoyo = i.yoyo, this.onUpdate = i.onUpdate, this.onComplete = i.onComplete, this.endTime = this.startTime + this.duration, this.game.tweens.add(this)
    }
    update() {
        var i, o;
        const t = Date.now();
        if (this.target instanceof Di && (this.target.destroyed || this.target.transform === void 0)) {
            this.kill();
            return
        }
        if (t >= this.endTime) {
            for (const [r, n] of Object.entries(this.endValues)) this.target[r] = n;
            this.yoyo ? (this.yoyo = !1, this.startTime = t, this.endTime = this.startTime + this.duration, [this.startValues, this.endValues] = [this.endValues, this.startValues]) : (this.kill(), (i = this.onComplete) == null || i.call(this));
            return
        }
        for (const r in this.startValues) {
            const n = this.startValues[r],
                c = this.endValues[r],
                h = (t - this.startTime) / this.duration;
            this.target[r] = E.lerp(n, c, (this.ease ?? (g => g))(h))
        }(o = this.onUpdate) == null || o.call(this)
    }
    kill() {
        this.dead = !0, this.game.tweens.delete(this)
    }
}
class Re {
    constructor(t, i) {
        s(this, "id");
        s(this, "game");
        s(this, "damageable", !1);
        s(this, "destroyed", !1);
        s(this, "debugGraphics");
        s(this, "_oldPosition");
        s(this, "_lastPositionChange");
        s(this, "_position", e.create(0, 0));
        s(this, "_positionManuallySet", !1);
        s(this, "_oldRotation");
        s(this, "_lastRotationChange");
        s(this, "_rotationManuallySet", !1);
        s(this, "_rotation", 0);
        s(this, "dead", !1);
        s(this, "container");
        s(this, "timeouts", new Set);
        this.game = t, this.id = i, this.container = new ve, this.game.camera.addObject(this.container)
    }
    get position() {
        return this._position
    }
    set position(t) {
        this._positionManuallySet && (this._oldPosition = e.clone(this._position)), this._positionManuallySet = !0, this._lastPositionChange = Date.now(), this._position = t
    }
    updateContainerPosition() {
        this.destroyed || this._oldPosition === void 0 || this._lastPositionChange === void 0 || this.container.position === void 0 || (this.container.position = K(e.lerp(this._oldPosition, this.position, Math.min((Date.now() - this._lastPositionChange) / C.msPerTick, 1))))
    }
    get rotation() {
        return this._rotation
    }
    set rotation(t) {
        this._rotationManuallySet && (this._oldRotation = this._rotation), this._rotationManuallySet = !0, this._lastRotationChange = Date.now(), this._rotation = t
    }
    updateContainerRotation() {
        this._oldRotation === void 0 || this._lastRotationChange === void 0 || this.container.rotation === void 0 || (this.container.rotation = E.lerp(this._oldRotation, this._oldRotation + ze.minimize(this._oldRotation, this._rotation), Math.min((Date.now() - this._lastRotationChange) / C.msPerTick, 1)))
    }
    addTimeout(t, i) {
        const o = this.game.addTimeout(t, i);
        return this.timeouts.add(o), o
    }
    destroy() {
        this.destroyed = !0;
        for (const t of this.timeouts) t.kill();
        this.container.destroy()
    }
    playSound(t, i) {
        return this.game.soundManager.play(t, {
            position: this.position,
            ...i
        })
    }
}
class da extends Re {
    constructor(i, o, r) {
        super(i, o);
        s(this, "type", D.Building);
        s(this, "ceilingContainer");
        s(this, "definition");
        s(this, "ceilingHitbox");
        s(this, "ceilingTween");
        s(this, "orientation");
        s(this, "ceilingVisible", !1);
        s(this, "errorSeq");
        s(this, "sound");
        this.container.zIndex = R.BuildingsFloor, this.ceilingContainer = new ve, this.game.camera.addObject(this.ceilingContainer), this.updateFromData(r, !0)
    }
    toggleCeiling() {
        var r, n, c;
        if (this.ceilingHitbox === void 0 || this.dead) return;
        const i = this.game.activePlayer;
        if (i === void 0) return;
        let o = !1;
        if (this.ceilingHitbox.collidesWith(i.hitbox)) o = !0;
        else {
            const g = new b(14, i.position),
                u = this.ceilingHitbox instanceof B ? this.ceilingHitbox.hitboxes : [this.ceilingHitbox];
            for (const f of u) {
                let x = null;
                f instanceof b ? x = it.circleCircleIntersection(f.position, f.radius, g.position, g.radius) : f instanceof l && (x = it.rectCircleIntersection(f.min, f.max, g.position, g.radius));
                const y = x == null ? void 0 : x.dir;
                if (y) {
                    const S = Math.atan2(y.y, y.x);
                    let v = !1;
                    const T = Math.PI / 2;
                    for (let z = S - T; z < S + T; z += .1) {
                        v = !1;
                        const _ = e.add(i.position, e.scale(e.create(Math.cos(z), Math.sin(z)), 14)),
                            I = (r = this.ceilingHitbox.intersectsLine(i.position, _)) == null ? void 0 : r.point;
                        if (!I) {
                            v = !0;
                            continue
                        }
                        for (const w of this.game.objects.getCategory(D.Obstacle))
                            if (w.damageable && !w.dead && w.definition.role !== H.Window && ((n = w.hitbox) != null && n.intersectsLine(i.position, I))) {
                                v = !0;
                                break
                            } if (!v) break
                    }
                    o = !v
                } else o = !1;
                if (o) break
            }
        }
        //the red boxes dissapear, prevent that in a sec...
        //i think container 1 is it
        this.ceilingVisible !== o && (this.ceilingVisible = o, (c = this.ceilingTween) == null || c.kill(), this.ceilingTween = new V(this.game, {
            target: this.ceilingContainer,
            to: {
                //hide ceilings esp
                alpha: this.definition.idString == "container_1" ? 1 : 0
            },
            duration: o ? 150 : 300,
            ease: Q.sineOut
        }))
    }
    updateFromData(i, o = !1) {
        //includes prev scope
        window.globalvar = this;
        var n, c, h, g, u, f, x, y, S;
        if (i.full) {
            const v = i.full;
            this.definition = v.definition, this.position = v.position;
            for (const z of this.definition.floorImages ?? []) {
                const _ = new O(z.key);
                _.setVPos(K(z.position)), z.tint !== void 0 && _.setTint(z.tint), z.rotation && _.setRotation(z.rotation), z.scale && (_.scale = z.scale), this.container.addChild(_)
            }
            const T = K(this.position);
            this.container.position.copyFrom(T), this.ceilingContainer.position.copyFrom(T), this.ceilingContainer.zIndex = this.definition.ceilingZIndex ?? R.BuildingsCeiling, this.orientation = v.rotation, this.rotation = ze.orientationToRotation(this.orientation), this.container.rotation = this.rotation, this.ceilingContainer.rotation = this.rotation, this.ceilingHitbox = (n = this.definition.scopeHitbox ?? this.definition.ceilingHitbox) == null ? void 0 : n.transform(this.position, 1, this.orientation)
        }
        const r = this.definition;
        if (r === void 0 && console.warn("Building partially updated before being fully updated"), r.sounds) {
            const v = this.definition.sounds,
                T = {
                    position: e.add(e.rotate((v == null ? void 0 : v.position) ?? e.create(0, 0), this.rotation), this.position),
                    fallOff: v.falloff,
                    maxRange: v.maxRange,
                    dynamic: !0,
                    loop: !0
                };
            v.normal && !((c = i.puzzle) != null && c.solved) && ((h = this.sound) == null ? void 0 : h.name) !== v.normal && ((g = this.sound) == null || g.stop(), this.sound = this.game.soundManager.play(v.normal, T)), v.solved && ((u = i.puzzle) != null && u.solved) && ((f = this.sound) == null ? void 0 : f.name) !== v.solved && ((x = this.sound) == null || x.stop(), this.sound = this.game.soundManager.play(v.solved, T))
        }
        i.dead && (!this.dead && !o && (this.game.particleManager.spawnParticles(10, () => {
            var v;
            return {
                frames: `${this.definition.idString}_particle`,
                position: ((v = this.ceilingHitbox) == null ? void 0 : v.randomPoint()) ?? {
                    x: 0,
                    y: 0
                },
                zIndex: 10,
                lifetime: 2e3,
                rotation: {
                    start: fe(),
                    end: fe()
                },
                alpha: {
                    start: 1,
                    end: 0,
                    ease: Q.sexticIn
                },
                scale: {
                    start: 1,
                    end: .2
                },
                speed: e.fromPolar(fe(), j(1, 2))
            }
        }), this.playSound("ceiling_collapse", {
            falloff: .5,
            maxRange: 96
        })), (y = this.ceilingTween) == null || y.kill(), this.ceilingContainer.zIndex = R.DeadObstacles, this.ceilingContainer.alpha = 1, this.ceilingContainer.addChild(new O(`${r.idString}_residue`))), this.dead = i.dead, i.puzzle && (!o && i.puzzle.errorSeq !== this.errorSeq && this.playSound("puzzle_error"), this.errorSeq = i.puzzle.errorSeq, !o && i.puzzle.solved && ((S = r.puzzle) != null && S.solvedSound) && this.playSound("puzzle_solved")), this.ceilingContainer.removeChildren();
        for (const v of r.ceilingImages ?? []) {
            let T = v.key;
            this.dead && v.residue && (T = v.residue);
            const z = new O(T);
            z.setVPos(K(v.position)), v.tint !== void 0 && z.setTint(v.tint), this.ceilingContainer.addChild(z)
        }
        /*ceiling esp*/
        this.ceilingContainer.alpha = 0;
    }
    destroy() {
        var i, o;
        super.destroy(), (i = this.ceilingTween) == null || i.kill(), this.ceilingContainer.destroy(), (o = this.sound) == null || o.stop()
    }
}
class ma {
    constructor(t) {
        s(this, "particles", new Set);
        s(this, "emitters", new Set);
        s(this, "game");
        this.game = t
    }
    update(t) {
        for (const i of this.particles) i.update(t), i.dead && (this.particles.delete(i), i.image.destroy());
        for (const i of this.emitters) {
            if (i.dead) {
                this.emitters.delete(i);
                continue
            }
            i.active && i.lastSpawn + i.delay < Date.now() && (this.spawnParticle(i.spawnOptions()), i.lastSpawn = Date.now())
            //smoke alpha
            i.alpha = 0.1;
        }
    }
    spawnParticle(t) {
        const i = new ua(t);
        return this.particles.add(i), this.game.camera.addObject(i.image), i
    }
    spawnParticles(t, i) {
        for (let o = 0; o < t; o++) this.spawnParticle(i())
    }
    addEmitter(t) {
        const i = new pa(t);
        return this.emitters.add(i), i
    }
    clear() {
        this.particles.clear(), this.emitters.clear()
    }
}
class ua {
    constructor(t) {
        s(this, "position");
        s(this, "image");
        s(this, "_spawnTime", Date.now());
        s(this, "_deathTime", Date.now());
        s(this, "dead", !1);
        s(this, "options");
        s(this, "scale");
        s(this, "alpha");
        s(this, "rotation");
        this._deathTime = this._spawnTime + t.lifetime, this.position = t.position;
        const i = t.frames,
            o = typeof i == "string" ? i : i[wi(0, i.length - 1)];
        this.image = new O(o), this.image.setZIndex(t.zIndex), this.scale = typeof t.scale == "number" ? t.scale : 1, this.alpha = typeof t.alpha == "number" ? t.alpha : 1, this.rotation = typeof t.rotation == "number" ? t.rotation : fe(), this.options = t
    }
    get spawnTime() {
        return this._spawnTime
    }
    get deathTime() {
        return this._deathTime
    }
    update(t) {
        this.position = e.add(this.position, e.scale(e.scale(this.options.speed, t), .001));
        const i = this.options,
            o = Date.now();
        let r;
        o >= this._deathTime ? (this.dead = !0, r = 1) : r = (o - this._spawnTime) / i.lifetime, typeof i.scale == "object" && (this.scale = E.lerp(i.scale.start, i.scale.end, (i.scale.ease ?? (n => n))(r))), typeof i.alpha == "object" && (this.alpha = E.lerp(i.alpha.start, i.alpha.end, (i.alpha.ease ?? (n => n))(r))), typeof i.rotation == "object" && (this.rotation = E.lerp(i.rotation.start, i.rotation.end, (i.rotation.ease ?? (n => n))(r))), this.image.position.copyFrom(K(this.position)), this.image.scale.set(this.scale), this.image.setRotation(this.rotation).setAlpha(this.alpha)
    }
}
class pa {
    constructor(t) {
        s(this, "_dead", !1);
        s(this, "lastSpawn", 0);
        s(this, "delay");
        s(this, "active");
        s(this, "spawnOptions");
        this.delay = t.delay, this.active = t.active, this.spawnOptions = t.spawnOptions
    }
    get dead() {
        return this._dead
    }
    destroy() {
        this._dead = !0
    }
}
const hi = Ce(se);
class Bt extends ye {
    constructor() {
        super(...arguments);
        s(this, "allocBytes", 3);
        s(this, "type", Z.Spectate);
        s(this, "spectateAction");
        s(this, "playerID")
    }
    serialize() {
        super.serialize();
        const i = this.stream;
        i.writeBits(this.spectateAction, hi), this.playerID !== void 0 && this.spectateAction === se.SpectateSpecific && i.writeObjectID(this.playerID)
    }
    deserialize(i) {
        this.spectateAction = i.readBits(hi), this.spectateAction === se.SpectateSpecific && (this.playerID = i.readObjectID())
    }
}
class $e extends Re {
    constructor(i, o, r) {
        super(i, o);
        s(this, "type", D.Player);
        s(this, "name");
        s(this, "activeItem", W.fromString("fists"));
        s(this, "_oldItem", this.activeItem);
        s(this, "equipment", {
            backpack: W.fromString("bag")
        });
        s(this, "footstepSound");
        s(this, "actionSound");
        s(this, "action", {
            type: De.None,
            item: void 0
        });
        s(this, "damageable", !0);
        s(this, "images");
        s(this, "hideEquipment", !1);
        s(this, "emoteContainer");
        s(this, "healingParticlesEmitter");
        s(this, "anims", {});
        s(this, "_emoteHideTimeout");
        s(this, "distSinceLastFootstep", 0);
        s(this, "helmetLevel", 0);
        s(this, "vestLevel", 0);
        s(this, "backpackLevel", 0);
        s(this, "hitbox", new b(C.player.radius));
        s(this, "floorType", "grass");
        this.images = {
            aimTrail: new Bi(Rt.from("aimTrail.svg"), 20, 6e3),
            vest: new O().setVisible(!1),
            body: new O,
            leftFist: new O,
            rightFist: new O,
            backpack: new O().setPos(-55, 0).setVisible(!1).setZIndex(5),
            helmet: new O().setPos(-8, 0).setVisible(!1).setZIndex(6),
            weapon: new O().setZIndex(3),
            altWeapon: new O().setZIndex(3),
            muzzleFlash: new O("muzzle_flash").setVisible(!1).setZIndex(7).setAnchor(e.create(0, .5)),
            emoteBackground: new O("emote_background").setPos(0, 0),
            emote: new O().setPos(0, 0),
            waterOverlay: new O("water_overlay").setVisible(!1).setTint(de.water)
        }, this.container.addChild(this.images.aimTrail, this.images.vest, this.images.body, this.images.waterOverlay, this.images.leftFist, this.images.rightFist, this.images.weapon, this.images.altWeapon, this.images.muzzleFlash, this.images.backpack, this.images.helmet), this.container.eventMode = "static", this.images.aimTrail.angle = 90, this.images.aimTrail.position = e.create(6e3, -8), this.images.aimTrail.alpha = 0, this.isActivePlayer || (this.images.aimTrail.alpha = 0), this.emoteContainer = new ve, this.game.camera.addObject(this.emoteContainer), this.emoteContainer.addChild(this.images.emoteBackground, this.images.emote), this.emoteContainer.zIndex = R.Emotes, this.emoteContainer.visible = !1, this.updateFistsPosition(!1), this.updateWeapon(), this.healingParticlesEmitter = this.game.particleManager.addEmitter({
            delay: 350,
            active: !1,
            spawnOptions: () => {
                var c;
                let n = "";
                return ((c = this.action.item) == null ? void 0 : c.itemType) === p.Healing && (n = Ct[this.action.item.healType].toLowerCase()), {
                    frames: `${n}_particle`,
                    position: this.hitbox.randomPoint(),
                    lifetime: 1e3,
                    zIndex: R.Players,
                    rotation: 0,
                    alpha: {
                        start: 1,
                        end: 0
                    },
                    scale: {
                        start: 1,
                        end: 1.5
                    },
                    speed: e.create(j(-1, 1), -3)
                }
            }
        }), this.container.on("pointerdown", () => {
            if (!this.game.spectating || this.game.activePlayerID === this.id) return;
            const n = new Bt;
            n.spectateAction = se.SpectateSpecific, n.playerID = this.id, this.game.sendPacket(n)
        }), this.updateFromData(r, !0)
    }
    get isActivePlayer() {
        return this.id === this.game.activePlayerID
    }
    updateContainerPosition() {
        super.updateContainerPosition(), this.destroyed || (this.emoteContainer.position = e.addComponent(this.container.position, 0, -175))
    }
    spawnCasingParticles(i = !1) {
        const o = this.activeItem,
            r = this._getItemReference(),
            n = this.rotation + Math.PI / 2,
            c = r.casingParticles;
        if (c === void 0) return;
        const h = e.clone(c.position);
        o.isDual && (h.y = (i ? -1 : 1) * (h.y + o.leftRightOffset));
        const g = () => {
            var x, y;
            const u = (x = c.velocity) == null ? void 0 : x.x,
                f = (y = c.velocity) == null ? void 0 : y.y;
            this.game.particleManager.spawnParticles(c.count ?? 1, () => {
                const S = j(Math.PI / 2, Math.PI),
                    v = Ue((u == null ? void 0 : u.min) ?? 2, (u == null ? void 0 : u.max) ?? -5, (f == null ? void 0 : f.min) ?? 10, (f == null ? void 0 : f.max) ?? 15);
                return u != null && u.randomSign && (v.x *= tt()), f != null && f.randomSign && (v.y *= tt()), {
                    frames: `${o.ammoType}_particle`,
                    zIndex: R.Players,
                    position: e.add(this.position, e.rotate(h, this.rotation)),
                    lifetime: 400,
                    scale: {
                        start: .8,
                        end: .4
                    },
                    alpha: {
                        start: 1,
                        end: 0,
                        ease: Q.sexticIn
                    },
                    rotation: {
                        start: n,
                        end: n + Math.sign(v.y) * S
                    },
                    speed: e.rotate(e.addComponent(v, -(S / 4), 0), this.rotation)
                }
            })
        };
        if (!c.ejectionDelay) g();
        else {
            const u = o.idString;
            this.addTimeout(() => {
                u === this.activeItem.idString && g()
            }, c.ejectionDelay)
        }
    }
    updateFromData(i, o = !1) {
        var g, u, f, x, y;
        const r = e.clone(this.position);
        this.position = i.position, this.hitbox.position = this.position, this.rotation = i.rotation;
        const n = !this.game.console.getBuiltInCVar("cv_movement_smoothing");
        (n || o) && (this.container.rotation = this.rotation), this.isActivePlayer && (this.game.soundManager.position = this.position, this.game.map.setPosition(this.position), n && (this.game.camera.position = K(this.position)), this.game.console.getBuiltInCVar("cv_responsive_rotation") || this.game.map.indicator.setRotation(i.rotation), this.game.console.getBuiltInCVar("pf_show_pos") && d("#coordinates-hud").text(`X: ${this.position.x.toFixed(2)} Y: ${this.position.y.toFixed(2)}`));
        const c = this.game.map.terrain.getFloor(this.position),
            h = _e[c].overlay;
        if (this.container.zIndex = h ? R.UnderwaterPlayers : R.Players, c !== this.floorType && (h && this.images.waterOverlay.setVisible(!0), (g = this.anims.waterOverlay) == null || g.kill(), this.anims.waterOverlay = new V(this.game, {
                target: this.images.waterOverlay,
                to: {
                    alpha: h ? 1 : 0
                },
                duration: 200,
                onComplete: () => {
                    h || this.images.waterOverlay.setVisible(!1)
                }
            })), this.floorType = c, r !== void 0 && (this.distSinceLastFootstep += Me.distance(r, this.position), this.distSinceLastFootstep > 10 && (this.footstepSound = this.playSound(`${this.floorType}_step_${wi(1,2)}`, {
                falloff: .6,
                maxRange: 48
            }), this.distSinceLastFootstep = 0, _e[c].particles))) {
            const S = {
                frames: "ripple_particle",
                zIndex: R.Ground,
                position: this.hitbox.randomPoint(),
                lifetime: 1e3,
                speed: e.create(0, 0)
            };
            this.game.particleManager.spawnParticle({
                ...S,
                scale: {
                    start: j(.45, .55),
                    end: j(2.95, 3.05)
                },
                alpha: {
                    start: j(.55, .65),
                    end: 0
                }
            }), this.game.particleManager.spawnParticle({
                ...S,
                scale: {
                    start: j(.15, .35),
                    end: j(1.45, 1.55)
                },
                alpha: {
                    start: j(.25, .35),
                    end: 0
                }
            })
        }
        if ((o || !this.game.console.getBuiltInCVar("cv_movement_smoothing")) && (this.container.position.copyFrom(K(this.position)), this.emoteContainer.position.copyFrom(e.add(K(this.position), e.create(0, -175)))), i.animation !== void 0 && this.playAnimation(i.animation), i.action !== void 0) {
            const S = i.action;
            let v = "";
            switch (this.healingParticlesEmitter.active = !1, (u = this.actionSound) == null || u.stop(), S.type) {
                case De.None: {
                    this.isActivePlayer && this.game.uiManager.cancelAction();
                    break
                }
                case De.Reload: {
                    const T = this.activeItem;
                    (f = this._getItemReference().casingParticles) != null && f.spawnOnReload && (T.isDual && this.spawnCasingParticles(!0), this.spawnCasingParticles(!1)), v = `${T.idString}_reload`, this.isActivePlayer && this.game.uiManager.animateAction("Reloading...", T.reloadTime);
                    break
                }
                case De.UseItem: {
                    const T = S.item;
                    v = T.idString, this.healingParticlesEmitter.active = !0, this.isActivePlayer && this.game.uiManager.animateAction(`${T.useText} ${T.name}`, T.useTime);
                    break
                }
            }
            v && (this.actionSound = this.playSound(v, {
                falloff: .6,
                maxRange: 48
            })), this.action = S
        }
        if (i.full) {
            const S = i.full;
            this.container.visible = !S.dead, this.dead = S.dead, this.container.alpha = S.invulnerable ? .5 : 1, this._oldItem = this.activeItem;
            const v = this.activeItem !== S.activeItem;
            this.activeItem = S.activeItem;
            const T = S.skin.idString;
            this.isActivePlayer && (this.game.uiManager.skinID = T, this.game.uiManager.updateWeapons());
            const z = W.fromString(T),
                _ = z.grassTint ? _i : 16777215;
            this.images.body.setFrame(`${T}_base`).setTint(_), this.images.leftFist.setFrame(`${T}_fist`).setTint(_), this.images.rightFist.setFrame(`${T}_fist`).setTint(_);
            const {
                hideEquipment: I,
                helmetLevel: w,
                vestLevel: m,
                backpackLevel: k
            } = this;
            this.hideEquipment = z.hideEquipment, this.helmetLevel = ((x = this.equipment.helmet = S.helmet) == null ? void 0 : x.level) ?? 0, this.vestLevel = ((y = this.equipment.vest = S.vest) == null ? void 0 : y.level) ?? 0, this.backpackLevel = (this.equipment.backpack = S.backpack).level, (I !== this.hideEquipment || w !== this.helmetLevel || m !== this.vestLevel || k !== this.backpackLevel) && this.updateEquipment(), v && (this.updateFistsPosition(!0), this.updateWeapon(o))
        }
    }
    _getItemReference() {
        const i = this.activeItem;
        return i.itemType === p.Gun && i.isDual ? W.fromString(i.singleVariant) : i
    }
    _getOffset() {
        const i = this.activeItem;
        return i.itemType === p.Gun && i.isDual ? i.leftRightOffset * N : 0
    }
    updateFistsPosition(i) {
        var c, h, g;
        (c = this.anims.leftFist) == null || c.kill(), (h = this.anims.rightFist) == null || h.kill(), (g = this.anims.weapon) == null || g.kill();
        const o = this._getItemReference(),
            r = o.fists ?? {
                left: e.create(38, -35),
                right: e.create(38, 35)
            },
            n = this._getOffset();
        if (i) {
            const u = "animationDuration" in r ? r.animationDuration : 150;
            this.anims.leftFist = new V(this.game, {
                target: this.images.leftFist,
                to: {
                    x: r.left.x,
                    y: r.left.y - n
                },
                duration: u
            }), this.anims.rightFist = new V(this.game, {
                target: this.images.rightFist,
                to: {
                    x: r.right.x,
                    y: r.right.y + n
                },
                duration: u
            })
        } else this.images.leftFist.setPos(r.left.x, r.left.y - n), this.images.rightFist.setPos(r.right.x, r.right.y + n);
        o.image && (this.images.weapon.setPos(o.image.position.x, o.image.position.y + n), this.images.altWeapon.setPos(o.image.position.x, o.image.position.y - n), this.images.weapon.setAngle(o.image.angle ?? 0))
    }
    updateWeapon(i = !1) {
        var n, c;
        const o = this.activeItem,
            r = this._getItemReference();
        if (this.images.weapon.setVisible(r.image !== void 0), this.images.muzzleFlash.setVisible(r.image !== void 0), r.image) {
            const h = `${r.idString}${o.itemType===p.Gun||r.image.separateWorldImage?"_world":""}`;
            this.images.weapon.setFrame(h), this.images.altWeapon.setFrame(h), this.images.weapon.setAngle(r.image.angle ?? 0), this.images.altWeapon.setAngle(r.image.angle ?? 0), this.activeItem !== this._oldItem && ((n = this.anims.muzzleFlashFade) == null || n.kill(), (c = this.anims.muzzleFlashRecoil) == null || c.kill(), this.images.muzzleFlash.alpha = 0, this.isActivePlayer && !i && this.game.soundManager.play(`${r.idString}_switch`));
            const g = this._getOffset();
            this.images.weapon.setPos(r.image.position.x, r.image.position.y + g), this.images.altWeapon.setPos(r.image.position.x, r.image.position.y - g)
        }
        switch (this.images.altWeapon.setVisible(o.itemType === p.Gun && (o.isDual ?? !1)), o.itemType) {
            case p.Gun: {
                this.images.rightFist.setZIndex(r.fists.rightZIndex ?? 1), this.images.leftFist.setZIndex(r.fists.leftZIndex ?? 1), this.images.weapon.setZIndex(2), this.images.altWeapon.setZIndex(2), this.images.body.setZIndex(3);
                break
            }
            case p.Melee: {
                this.images.leftFist.setZIndex(4), this.images.rightFist.setZIndex(4), this.images.body.setZIndex(2), this.images.weapon.setZIndex(1);
                break
            }
            case p.Throwable: {
                this.images.leftFist.setZIndex(4), this.images.rightFist.setZIndex(4), this.images.body.setZIndex(2), this.images.weapon.setZIndex(5);
                break
            }
        }
        this.images.waterOverlay.setZIndex(this.images.body.zIndex + 1), this.container.sortChildren()
    }
    updateEquipment() {
        for (const i of ["helmet", "vest", "backpack"]) this.updateEquipmentWorldImage(i, this.equipment[i]), this.isActivePlayer && this.updateEquipmentSlot(i, this.equipment[i])
    }
    updateEquipmentWorldImage(i, o) {
        const r = this.images[i];
        o && o.level > 0 && !this.hideEquipment ? r.setFrame(`${o.idString}_world`).setVisible(!0) : r.setVisible(!1)
    }
    updateEquipmentSlot(i, o) {
        const r = d(`#${i}-slot`);
        if (o && o.level > 0) {
            r.children(".item-name").text(`Lvl. ${o.level}`), r.children(".item-image").attr("src", `./img/game/loot/${o.idString}.svg`);
            let n = o.name;
            o.itemType === p.Armor && (n += `<br>Reduces ${o.damageReduction*100}% damage`), r.children(".item-tooltip").html(n)
        }
        r.css("visibility", ((o == null ? void 0 : o.level) ?? 0) > 0 ? "visible" : "hidden"), i === "backpack" && this.game.uiManager.updateItems()
    }
    emote(i) {
        var o, r, n;
        (o = this.anims.emote) == null || o.kill(), (r = this.anims.emoteHide) == null || r.kill(), (n = this._emoteHideTimeout) == null || n.kill(), this.playSound("emote", {
            falloff: .4,
            maxRange: 128
        }), this.images.emote.setFrame(`${i.idString}`), this.emoteContainer.visible = !0, this.emoteContainer.scale.set(0), this.emoteContainer.alpha = 0, this.anims.emote = new V(this.game, {
            target: this.emoteContainer,
            to: {
                alpha: 1
            },
            duration: 250,
            ease: Q.backOut,
            onUpdate: () => {
                this.emoteContainer.scale.set(this.emoteContainer.alpha)
            }
        }), this._emoteHideTimeout = this.addTimeout(() => {
            this.anims.emoteHide = new V(this.game, {
                target: this.emoteContainer,
                to: {
                    alpha: 0
                },
                duration: 200,
                onUpdate: () => {
                    this.emoteContainer.scale.set(this.emoteContainer.alpha)
                },
                onComplete: () => {
                    this.emoteContainer.visible = !1
                }
            })
        }, 4e3)
    }
    playAnimation(i) {
        var o, r, n, c, h, g;
        switch (i) {
            case ce.Melee: {
                if (this.activeItem.itemType !== p.Melee) {
                    console.warn(`Attempted to play melee animation with non melee item ${this.activeItem.idString}`);
                    return
                }
                this.updateFistsPosition(!1);
                const u = this.activeItem;
                if (u.fists.useLeft === void 0) break;
                let f = Math.random() < .5;
                u.fists.randomFist || (f = !0);
                const x = u.fists.animationDuration;
                (!u.fists.randomFist || !f) && (this.anims.leftFist = new V(this.game, {
                    target: this.images.leftFist,
                    to: {
                        x: u.fists.useLeft.x,
                        y: u.fists.useLeft.y
                    },
                    duration: x,
                    ease: Q.sineIn,
                    yoyo: !0
                })), f && (this.anims.rightFist = new V(this.game, {
                    target: this.images.rightFist,
                    to: {
                        x: u.fists.useRight.x,
                        y: u.fists.useRight.y
                    },
                    duration: x,
                    ease: Q.sineIn,
                    yoyo: !0
                })), u.image !== void 0 && (this.anims.weapon = new V(this.game, {
                    target: this.images.weapon,
                    to: {
                        x: u.image.usePosition.x,
                        y: u.image.usePosition.y,
                        angle: u.image.useAngle
                    },
                    duration: x,
                    ease: Q.sineIn,
                    yoyo: !0
                })), this.playSound("swing", {
                    falloff: .4,
                    maxRange: 96
                }), this.addTimeout(() => {
                    var z;
                    const y = e.rotate(u.offset, this.rotation),
                        S = e.add(this.position, y),
                        v = new b(u.radius, S),
                        T = [];
                    for (const _ of this.game.objects) !_.dead && _ !== this && _.damageable && (_ instanceof ne || _ instanceof $e) && (z = _.hitbox) != null && z.collidesWith(v) && T.push(_);
                    T.sort((_, I) => _ instanceof ne && _.definition.noMeleeCollision ? 1 / 0 : I instanceof ne && I.definition.noMeleeCollision ? -1 / 0 : _.hitbox.distanceTo(this.hitbox).distance - I.hitbox.distanceTo(this.hitbox).distance).slice(0, Math.min(T.length, u.maxTargets)).forEach(_ => _.hitEffect(S, ze.betweenPoints(this.position, S)))
                }, 50);
                break
            }
            case ce.Gun:
            case ce.GunAlt:
            case ce.LastShot: {
                if (this.activeItem.itemType !== p.Gun) {
                    console.warn(`Attempted to play gun animation with non gun item ${this.activeItem.idString}`);
                    return
                }
                const u = this.activeItem,
                    f = this._getItemReference();
                this.playSound(`${f.idString}_fire`, {
                    falloff: .5
                }), i === ce.LastShot && this.playSound(`${f.idString}_last_shot`, {
                    falloff: .5
                });
                const x = u.isDual ? i === ce.GunAlt : void 0;
                this.updateFistsPosition(!1);
                const y = N * (1 - u.recoilMultiplier);
                if (this.anims.weapon = new V(this.game, {
                        target: x ? this.images.altWeapon : this.images.weapon,
                        to: {
                            x: f.image.position.x - y
                        },
                        duration: 50,
                        yoyo: !0
                    }), !u.noMuzzleFlash) {
                    const S = this.images.muzzleFlash;
                    S.x = u.length * N, S.y = (x ? -1 : 1) * this._getOffset(), S.setVisible(!0), S.alpha = .95, S.scale = e.create(j(.75, 1.25), j(.5, 1.5) * (wt() ? 1 : -1)), (o = this.anims.muzzleFlashFade) == null || o.kill(), (r = this.anims.muzzleFlashRecoil) == null || r.kill(), this.anims.muzzleFlashFade = new V(this.game, {
                        target: S,
                        to: {
                            alpha: 0
                        },
                        duration: 100,
                        onComplete: () => S.setVisible(!1)
                    }), this.anims.muzzleFlashRecoil = new V(this.game, {
                        target: S,
                        to: {
                            x: S.x - y
                        },
                        duration: 50,
                        yoyo: !0
                    })
                }
                x !== !1 && (this.anims.leftFist = new V(this.game, {
                    target: this.images.leftFist,
                    to: {
                        x: f.fists.left.x - y
                    },
                    duration: 50,
                    yoyo: !0
                })), x !== !0 && (this.anims.rightFist = new V(this.game, {
                    target: this.images.rightFist,
                    to: {
                        x: f.fists.right.x - y
                    },
                    duration: 50,
                    yoyo: !0
                })), (n = f.casingParticles) != null && n.spawnOnReload || this.spawnCasingParticles(x);
                break
            }
            case ce.GunClick: {
                this.playSound("gun_click", {
                    falloff: .8,
                    maxRange: 48
                });
                break
            }
            case ce.ThrowableCook: {
                if (this.activeItem.itemType !== p.Throwable) {
                    console.warn(`Attempted to play throwable animation with non throwable item ${this.activeItem.idString}`);
                    return
                }
                this.playSound("throwable_pin");
                const u = this.activeItem,
                    f = this.images.weapon,
                    x = this.images.altWeapon;
                f.visible = !0, x.setFrame(u.animation.pinImage), x.setPos(35, 0), x.setZIndex(R.Players + 1), f.setFrame(u.animation.cook.cookingImage ?? u.animation.liveImage), this.anims.leftFist = new V(this.game, {
                    target: this.images.leftFist,
                    to: {
                        x: 35,
                        y: 0
                    },
                    duration: u.cookTime / 2,
                    onComplete: () => {
                        this.anims.leftFist = new V(this.game, {
                            target: this.images.leftFist,
                            to: e.scale(u.animation.cook.leftFist, N),
                            duration: u.cookTime / 2
                        }), x.visible = !0, this.anims.pin = new V(this.game, {
                            target: x,
                            duration: u.cookTime / 2,
                            to: {
                                ...e.add(e.scale(u.animation.cook.leftFist, N), e.create(15, 0))
                            }
                        })
                    }
                }), u.cookable && this.game.particleManager.spawnParticle({
                    frames: u.animation.leverImage,
                    lifetime: 600,
                    position: this.position,
                    zIndex: R.Players + 1,
                    speed: e.rotate(e.create(8, 8), this.rotation),
                    rotation: this.rotation,
                    alpha: {
                        start: 1,
                        end: 0
                    },
                    scale: {
                        start: .8,
                        end: 1
                    }
                }), this.anims.weapon = new V(this.game, {
                    target: f,
                    to: {
                        x: 25,
                        y: 10
                    },
                    duration: u.cookTime / 2
                }), this.anims.rightFist = new V(this.game, {
                    target: this.images.rightFist,
                    to: {
                        x: 25,
                        y: 10
                    },
                    duration: u.cookTime / 2,
                    onComplete: () => {
                        this.anims.weapon = new V(this.game, {
                            target: f,
                            to: e.scale(u.animation.cook.rightFist, N),
                            duration: u.cookTime / 2
                        }), this.anims.rightFist = new V(this.game, {
                            target: this.images.rightFist,
                            to: e.scale(u.animation.cook.rightFist, N),
                            duration: u.cookTime / 2
                        })
                    }
                });
                break
            }
            case ce.ThrowableThrow: {
                if (this.activeItem.itemType !== p.Throwable) {
                    console.warn(`Attempted to play throwable animation with non throwable item ${this.activeItem.idString}`);
                    return
                }
                this.playSound("throwable_throw");
                const u = this.activeItem;
                this.images.altWeapon.visible = !1;
                const f = this.images.weapon;
                f.visible = !1, f.setFrame(u.idString), u.cookable || this.game.particleManager.spawnParticle({
                    frames: u.animation.leverImage,
                    lifetime: 600,
                    position: this.position,
                    zIndex: R.Players + 1,
                    speed: e.rotate(e.create(8, 8), this.rotation),
                    rotation: this.rotation,
                    alpha: {
                        start: 1,
                        end: 0
                    },
                    scale: {
                        start: .8,
                        end: 1
                    }
                }), (c = this.anims.rightFist) == null || c.kill(), (h = this.anims.leftFist) == null || h.kill(), (g = this.anims.weapon) == null || g.kill(), this.anims.leftFist = new V(this.game, {
                    target: this.images.leftFist,
                    to: e.scale(u.animation.throw.leftFist, N),
                    duration: u.throwTime,
                    onComplete: () => {
                        f.setVisible(!0), this.updateFistsPosition(!0)
                    }
                }), this.anims.rightFist = new V(this.game, {
                    target: this.images.rightFist,
                    to: e.scale(u.animation.throw.rightFist, N),
                    duration: u.throwTime
                });
                break
            }
        }
    }
    hitEffect(i, o) {
        this.game.soundManager.play(wt() ? "player_hit_1" : "player_hit_2", {
            position: i,
            falloff: .2,
            maxRange: 96
        }), this.game.particleManager.spawnParticle({
            frames: "blood_particle",
            zIndex: R.Players + 1,
            position: i,
            lifetime: 1e3,
            scale: {
                start: .5,
                end: 1
            },
            alpha: {
                start: 1,
                end: 0
            },
            speed: e.fromPolar(o, j(.5, 1))
        })
    }
    destroy() {
        var r, n, c, h, g, u, f, x, y;
        super.destroy();
        const i = this.images;
        i.aimTrail.destroy(), i.vest.destroy(), i.body.destroy(), i.leftFist.destroy(), i.rightFist.destroy(), i.backpack.destroy(), i.helmet.destroy(), i.weapon.destroy(), i.altWeapon.destroy(), i.muzzleFlash.destroy(), i.emoteBackground.destroy(), i.emote.destroy(), i.waterOverlay.destroy(), this.healingParticlesEmitter.destroy(), (r = this.actionSound) == null || r.stop(), this.isActivePlayer && d("#action-container").hide(), this.emoteContainer.destroy();
        const o = this.anims;
        (n = o.emoteHide) == null || n.kill(), (c = o.waterOverlay) == null || c.kill(), (h = o.emote) == null || h.kill(), (g = o.leftFist) == null || g.kill(), (u = o.rightFist) == null || u.kill(), (f = o.weapon) == null || f.kill(), (x = o.muzzleFlashFade) == null || x.kill(), (y = o.muzzleFlashRecoil) == null || y.kill()
    }
}
class ne extends Re {
    constructor(i, o, r) {
        super(i, o);
        s(this, "type", D.Obstacle);
        s(this, "damageable", !0);
        s(this, "image");
        s(this, "smokeEmitter");
        s(this, "particleFrames");
        s(this, "definition");
        s(this, "scale");
        s(this, "variation");
        s(this, "isDoor");
        s(this, "door");
        s(this, "activated");
        s(this, "hitbox");
        s(this, "orientation", 0);
        s(this, "hitSound");
        this.image = new O, this.container.addChild(this.image), this.updateFromData(r, !0)
    }
    updateFromData(i, o = !1) {
        var u, f, x, y, S, v, T;
        let r;
        if (i.full) {
            const z = i.full,
                _ = this.definition = z.definition;
            this.position = z.position, this.rotation = z.rotation.rotation, this.orientation = z.rotation.orientation, this.variation = z.variation, _.invisible && (this.container.visible = !1);
            const I = ((u = _.frames) == null ? void 0 : u.particle) ?? `${_.idString}_particle`;
            if (this.particleFrames = _.particleVariations !== void 0 ? Array.from({
                    length: _.particleVariations
                }, (w, m) => `${I}_${m+1}`) : [I], (_.explosion ?? "emitParticles" in _) && !this.smokeEmitter && (this.smokeEmitter = this.game.particleManager.addEmitter({
                    delay: 400,
                    active: !1,
                    spawnOptions: () => ({
                        frames: "smoke_particle",
                        position: this.position,
                        zIndex: Math.max((_.zIndex ?? R.ObstaclesLayer1) + 1, R.Players),
                        lifetime: 3500,
                        scale: {
                            start: 0,
                            end: j(4, 5)
                        },
                        alpha: {
                            start: 0.9,
                            end: 0
                        },
                        speed: e.fromPolar(j(-1.9, -2.1), j(5, 6))
                    })
                })), this.activated !== z.activated && (this.activated = z.activated, !o && !this.destroyed && (_.role === H.Activatable && _.sound && ("names" in _.sound ? _.sound.names.forEach(w => this.playSound(w, _.sound)) : this.playSound(_.sound.name, _.sound)), this.definition.idString === "airdrop_crate_locked"))) {
                const w = (m, k) => ({
                    zIndex: Math.max((this.definition.zIndex ?? R.Players) + 1, 4),
                    lifetime: 1e3,
                    scale: {
                        start: j(.85, .95),
                        end: 0,
                        ease: Q.quarticIn
                    },
                    alpha: {
                        start: 1,
                        end: 0,
                        ease: Q.sexticIn
                    },
                    rotation: {
                        start: fe(),
                        end: fe()
                    },
                    speed: e.fromPolar(fe(), j(m, k))
                });
                this.game.particleManager.spawnParticle({
                    frames: "airdrop_particle_1",
                    position: this.position,
                    ...w(8, 18),
                    rotation: {
                        start: 0,
                        end: j(Math.PI / 2, Math.PI * 2)
                    }
                }), r = "airdrop_crate_unlocking", this.addTimeout(() => {
                    this.game.particleManager.spawnParticles(4, () => ({
                        frames: "airdrop_particle_2",
                        position: this.hitbox.randomPoint(),
                        ...w(4, 9)
                    }))
                }, 800)
            }
            this.isDoor = _.role === H.Door, this.updateDoor(z, o)
        }
        const n = this.definition;
        this.scale = i.scale;
        const c = ((f = n.scale) == null ? void 0 : f.destroy) ?? 1,
            h = (this.scale - c) / ((((x = n.scale) == null ? void 0 : x.spawnMax) ?? 1) - c);
        if (this.smokeEmitter && (this.smokeEmitter.active = !this.dead && ("emitParticles" in n && this.activated || h > 0 && h < .5), "emitParticles" in n ? this.smokeEmitter.delay = 300 : this.smokeEmitter.delay = E.lerp(150, 3e3, h)), this.container.scale.set(this.dead ? 1 : this.scale), !this.dead && i.dead && (this.dead = !0, !o && !("replaceWith" in n && n.replaceWith))) {
            const z = _ => {
                this.playSound(_, {
                    falloff: .2,
                    maxRange: 96
                })
            };
            if (z(`${n.material}_destroyed`), n.additionalDestroySounds)
                for (const _ of n.additionalDestroySounds) z(_);
            n.noResidue ? this.image.setVisible(!1) : this.image.setFrame(((y = n.frames) == null ? void 0 : y.residue) ?? `${n.idString}_residue`), this.container.rotation = this.rotation, this.container.scale.set(this.scale), this.smokeEmitter && (this.smokeEmitter.active = !1, this.smokeEmitter.destroy()), this.game.particleManager.spawnParticles(10, () => ({
                frames: this.particleFrames,
                position: this.hitbox.randomPoint(),
                zIndex: (n.zIndex ?? R.ObstaclesLayer1) + 1,
                lifetime: 1500,
                rotation: {
                    start: fe(),
                    end: fe()
                },
                scale: {
                    start: j(.85, .95),
                    end: 0,
                    ease: Q.quarticIn
                },
                alpha: {
                    start: 1,
                    end: 0,
                    ease: Q.sexticIn
                },
                speed: e.fromPolar(fe(), j(4, 9) * (n.explosion ? 3 : 1))
            }))
        }
        this.container.zIndex = this.dead ? R.DeadObstacles : n.zIndex ?? R.ObstaclesLayer1, this.dead && _e[this.game.map.terrain.getFloor(this.position)].overlay && (this.container.zIndex = R.UnderWaterDeadObstacles), this.isDoor || (this.hitbox = n.hitbox.transform(this.position, this.scale, this.orientation));
        const g = K(this.position);
        this.container.position.copyFrom(g), this.image.setVisible(!(this.dead && n.noResidue)), r || (r = this.dead ? ((T = n.frames) == null ? void 0 : T.residue) ?? `${n.idString}_residue` : this.activated && ((S = n.frames) != null && S.activated) ? n.frames.activated : ((v = n.frames) == null ? void 0 : v.base) ?? `${n.idString}`), this.variation !== void 0 && !this.dead && (r += `_${this.variation+1}`), this.image.setFrame(r), n.tint !== void 0 && this.image.setTint(n.tint), this.container.rotation = this.rotation
    }
    updateDoor(i, o = !1) {
        if (!(i != null && i.door) || i.definition.role !== H.Door) return;
        const r = i.definition;
        this.door || (this.door = {
            offset: 0
        }), this.rotation = ze.orientationToRotation(this.orientation);
        const n = Ei(r, this.position, this.orientation);
        this.door.openHitbox = n.openHitbox, "openAltHitbox" in n && (this.door.openAltHitbox = n.openAltHitbox), this.door.locked = r.locked;
        let c = r.hitbox.transform(this.position, this.scale, this.orientation);
        switch (this.door.closedHitbox = c.clone(), i.door.offset) {
            case 1: {
                c = this.door.openHitbox.clone();
                break
            }
            case 3: {
                c = this.door.openAltHitbox.clone();
                break
            }
        }
        this.hitbox = this.door.hitbox = c;
        const h = i.door.offset;
        switch (r.operationStyle) {
            case "slide":
                if (o) {
                    const g = h ? (r.slideFactor ?? 1) * (c.min.x - c.max.x) * N : 0;
                    this.image.setPos(g, 0)
                }
                break;
            case "swivel":
            default:
                o && this.image.setRotation(ze.orientationToRotation(h)), this.image.anchor.set(0, .5), this.image.setPos(r.hingeOffset.x * N, r.hingeOffset.y * N);
                break
        }
        if (o && (this.door.offset = h), h !== this.door.offset && !o) {
            this.door.offset = h;
            const g = r.doorSound ?? "door";
            if (this.playSound(`${g}_${h?"open":"close"}`, {
                    falloff: .3,
                    maxRange: 48
                }), r.operationStyle !== "slide") new V(this.game, {
                target: this.image,
                to: {
                    rotation: ze.orientationToRotation(h)
                },
                duration: r.animationDuration ?? 150
            });
            else {
                const u = h ? (r.slideFactor ?? 1) * (c.min.x - c.max.x) * N : 0;
                new V(this.game, {
                    target: this.image.position,
                    to: {
                        x: u,
                        y: 0
                    },
                    duration: 150
                })
            }
        }
    }
    canInteract(i) {
        var o;
        return !this.dead && (this.isDoor && !((o = this.door) != null && o.locked) || this.definition.role === H.Activatable && (i.activeItem.idString === this.definition.requiredItem || !this.definition.requiredItem) && !this.activated)
    }
    hitEffect(i, o) {
        var r;
        (r = this.hitSound) == null || r.stop(), this.hitSound = this.game.soundManager.play(`${this.definition.material}_hit_${wt()?"1":"2"}`, {
            position: i,
            falloff: .2,
            maxRange: 96
        }), this.game.particleManager.spawnParticle({
            frames: this.particleFrames,
            position: i,
            zIndex: Math.max((this.definition.zIndex ?? R.Players) + 1, 4),
            lifetime: 600,
            scale: {
                start: .9,
                end: .2
            },
            alpha: {
                start: 1,
                end: .65
            },
            speed: e.fromPolar(o + j(-.3, .3), j(2.5, 4.5))
        })
    }
    destroy() {
        var i;
        super.destroy(), this.image.destroy(), (i = this.smokeEmitter) == null || i.destroy()
    }
}
class ga extends bi {
    constructor(i, o) {
        var c, h, g;
        super(o);
        s(this, "game");
        s(this, "image");
        s(this, "maxLength");
        s(this, "tracerLength");
        s(this, "_trailReachedMaxLength", !1);
        s(this, "_trailTicks", 0);
        this.game = i;
        const r = this.definition.tracer;
        this.image = new O((r == null ? void 0 : r.image) ?? "base_trail").setRotation(this.rotation - Math.PI / 2).setVPos(K(this.position)), this.tracerLength = (r == null ? void 0 : r.length) ?? 1, this.maxLength = this.image.width * this.tracerLength, this.image.scale.y = (r == null ? void 0 : r.width) ?? 1, this.image.alpha = ((r == null ? void 0 : r.opacity) ?? 1) / (this.reflectionCount + 1), (c = this.definition.tracer) != null && c.particle || this.image.anchor.set(1, .5);
        const n = new It(((h = this.definition.tracer) == null ? void 0 : h.color) ?? 16777215);
        we.bulletTrailAdjust && n.multiply(we.bulletTrailAdjust), this.image.tint = n, this.image.zIndex = ((g = this.definition.tracer) == null ? void 0 : g.zIndex) ?? R.Bullets, this.game.camera.addObject(this.image)
    }
    update(i) {
        var r, n, c, h;
        if (!this.dead) {
            const g = this.updateAndGetCollisions(i, this.game.objects);
            for (const u of g) {
                const f = u.object;
                if ((f instanceof ne || f instanceof $e) && f.hitEffect(u.intersection.point, Math.atan2(u.intersection.normal.y, u.intersection.normal.x)), this.damagedIDs.add(f.id), !(f instanceof ne && ((((r = this.definition.penetration) == null ? void 0 : r.obstacles) && !f.definition.impenetrable) ?? f.definition.noCollisions)) && !((n = this.definition.penetration) != null && n.players && f instanceof $e)) {
                    this.dead = !0, this.position = u.intersection.point;
                    break
                }
            }
        }!this.dead && !this._trailReachedMaxLength ? this._trailTicks += i : (this.dead || (c = this.definition.tracer) != null && c.particle) && (this._trailTicks -= i);
        const o = Me.distance(this.initialPosition, this.position);
        if ((h = this.definition.tracer) != null && h.particle) this.image.scale.set(1 + o / this.maxDistance), this.image.alpha = 2 * this.definition.speed * this._trailTicks / this.maxDistance, this._trailReachedMaxLength || (this._trailReachedMaxLength = this.image.alpha >= 1);
        else {
            const g = Math.min(Math.min(this.definition.speed * this._trailTicks, o) * N, this.maxLength);
            this.image.width = g, this._trailReachedMaxLength || (this._trailReachedMaxLength = g >= this.maxLength)
        }
        this.image.setVPos(K(this.position)), this._trailTicks <= 0 && this.dead && this.destroy()
    }
    destroy() {
        this.image.destroy(), this.game.bullets.delete(this)
    }
}
class fa extends Re {
    constructor(i, o, r) {
        super(i, o);
        s(this, "type", D.DeathMarker);
        s(this, "playerName");
        s(this, "nameColor", 14474460);
        s(this, "image");
        s(this, "playerNameText");
        s(this, "scaleAnim");
        s(this, "alphaAnim");
        this.image = new O("death_marker"), this.playerNameText = new gi(this.game.console.getBuiltInCVar("cv_anonymize_player_names") ? C.player.defaultName : "", {
            fontSize: 36,
            fontFamily: "Inter",
            dropShadow: !0,
            dropShadowBlur: 2,
            dropShadowDistance: 2,
            dropShadowColor: 0
        }), this.playerNameText.y = 95, this.playerNameText.anchor.set(.5), this.container.addChild(this.image, this.playerNameText), this.updateFromData(r, !0)
    }
    updateFromData(i, o = !1) {
        this.position = i.position, this.container.position.copyFrom(K(this.position)), this.container.zIndex = R.DeathMarkers, _e[this.game.map.terrain.getFloor(this.position)].overlay && (this.container.zIndex = R.UnderWaterDeadObstacles);
        const r = this.game.playerNames.get(i.playerID);
        r && (this.playerName = r.name, this.playerNameText.text = this.playerName, r.hasColor && (this.nameColor = r.nameColor.toNumber())), this.playerNameText.style.fill = this.nameColor, i.isNew && o && (this.container.scale.set(.5), this.container.alpha = 0, this.scaleAnim = new V(this.game, {
            target: this.container.scale,
            to: {
                x: 1,
                y: 1
            },
            duration: 400
        }), this.alphaAnim = new V(this.game, {
            target: this.container,
            to: {
                alpha: 1
            },
            duration: 400
        }))
    }
    destroy() {
        var i, o;
        super.destroy(), this.image.destroy(), this.playerNameText.destroy(), (i = this.scaleAnim) == null || i.kill(), (o = this.alphaAnim) == null || o.kill()
    }
}
class wa extends Re {
    constructor(i, o, r) {
        super(i, o);
        s(this, "type", D.Decal);
        s(this, "definition");
        s(this, "image");
        this.image = new O, this.updateFromData(r)
    }
    updateFromData(i) {
        this.position = i.position;
        const o = this.definition = i.definition;
        this.image.setFrame(o.image ?? o.idString), this.container.addChild(this.image), this.container.zIndex = o.zIndex ?? R.Decals, this.container.scale.set(o.scale ?? 1), this.container.position.copyFrom(K(this.position)), this.container.rotation = i.rotation, _e[this.game.map.terrain.getFloor(this.position)].overlay && !o.zIndex && (this.container.zIndex = R.UnderWaterDeadObstacles)
    }
    destroy() {
        this.image.destroy()
    }
}

function _a(a, t, i) {
    const o = K(i),
        r = new O("explosion_1");
    r.scale.set(0), r.tint = t.animation.tint, r.setVPos(o), a.camera.addObject(r), new V(a, {
        target: r.scale,
        to: {
            x: t.animation.scale,
            y: t.animation.scale
        },
        duration: t.animation.duration,
        ease: Q.expoOut
    }), new V(a, {
        target: r,
        to: {
            alpha: 0
        },
        duration: t.animation.duration * 1.5,
        ease: Q.expoOut,
        onComplete: () => {
            r.destroy()
        }
    }), _e[a.map.terrain.getFloor(i)].particles && a.particleManager.spawnParticles(4, () => ({
        frames: "ripple_particle",
        zIndex: R.Ground,
        position: yi(i, 6),
        lifetime: 1e3,
        speed: e.create(0, 0),
        scale: {
            start: j(.45, .55),
            end: j(2.95, 3.05)
        },
        alpha: {
            start: j(.55, .65),
            end: 0
        }
    })), a.camera.shake(t.cameraShake.duration, t.cameraShake.intensity), t.sound !== void 0 && a.soundManager.play(t.sound, {
        position: i,
        falloff: .4
    })
}
class Fe extends Re {
    constructor(i, o, r) {
        super(i, o);
        s(this, "type", D.Loot);
        s(this, "definition");
        s(this, "images");
        s(this, "_count", 0);
        s(this, "hitbox");
        s(this, "animation");
        this.images = {
            background: new O,
            item: new O
        }, this.updateFromData(r, !0)
    }
    get count() {
        return this._count
    }
    updateFromData(i, o = !1) {
        var n;
        if (i.full) {
            const c = this.definition = i.full.definition,
                h = c.itemType;
            this.images.item.setFrame(`${c.idString}${h===p.Skin?"_base":""}`), this.container.addChild(this.images.background, this.images.item), this.container.zIndex = R.Loot;
            let g;
            switch (h) {
                case p.Gun: {
                    g = `loot_background_gun_${c.ammoType}`, this.images.item.scale.set(.85);
                    break
                }
                case p.Melee: {
                    g = "loot_background_melee";
                    const u = (n = c.image) == null ? void 0 : n.lootScale;
                    u !== void 0 && this.images.item.scale.set(u);
                    break
                }
                case p.Healing: {
                    g = "loot_background_healing";
                    break
                }
                case p.Armor:
                case p.Backpack:
                case p.Scope:
                case p.Skin: {
                    g = "loot_background_equipment", c.itemType === p.Skin && (c.grassTint && this.images.item.setTint(_i), this.images.item.setAngle(90).setScale(.75));
                    break
                }
                case p.Throwable: {
                    g = "loot_background_throwable";
                    break
                }
            }
            g !== void 0 ? this.images.background.setFrame(g) : this.images.background.setVisible(!1), this.hitbox = new b(ji[h]), this._count = i.full.count || 1 / 0, i.full.isNew && o && (this.container.scale.set(.5), this.animation = new V(this.game, {
                target: this.container.scale,
                to: {
                    x: 1,
                    y: 1
                },
                duration: 1e3,
                ease: Q.elasticOut
            }))
        }
        this.position = i.position, this.hitbox.position = this.position;
        const r = this.game.map.terrain.getFloor(this.position);
        this.container.zIndex = _e[r].overlay ? R.UnderWaterLoot : R.Loot, (!this.game.console.getBuiltInCVar("cv_movement_smoothing") || o) && (this.container.position = K(this.position))
    }
    destroy() {
        var i;
        super.destroy(), this.images.background.destroy(), this.images.item.destroy(), (i = this.animation) == null || i.kill()
    }
    canInteract(i) {
        var n, c;
        const o = this.game.uiManager.inventory,
            r = this.definition;
        switch (r.itemType) {
            case p.Gun: {
                for (const h of o.weapons)
                    if ((h == null ? void 0 : h.definition.itemType) === p.Gun && (r.idString === h.definition.dualVariant || r === h.definition && h.definition.dualVariant)) return !0;
                return !o.weapons[0] || !o.weapons[1] || o.activeWeaponIndex < 2 && r !== ((n = o.weapons[o.activeWeaponIndex]) == null ? void 0 : n.definition)
            }
            case p.Melee:
                return r !== ((c = o.weapons[2]) == null ? void 0 : c.definition);
            case p.Healing:
            case p.Ammo:
            case p.Throwable: {
                const h = r.idString;
                return r.ephemeral ?? o.items[h] + 1 <= i.equipment.backpack.maxCapacity[h]
            }
            case p.Armor:
                switch (!0) {
                    case r.armorType === at.Helmet:
                        return r.level > i.helmetLevel;
                    case r.armorType === at.Vest:
                        return r.level > i.vestLevel;
                    default:
                        return !1
                }
            case p.Backpack:
                return r.level > i.backpackLevel;
            case p.Scope:
                return o.items[r.idString] === 0;
            case p.Skin:
                return !0
        }
    }
}
class ya extends Re {
    constructor(i, o, r) {
        super(i, o);
        s(this, "type", D.Parachute);
        s(this, "image", new O("airdrop_parachute"));
        s(this, "scaleAnim");
        s(this, "fallSound");
        this.container.addChild(this.image), this.container.zIndex = R.ObstaclesLayer5, this.updateFromData(r, !0)
    }
    updateFromData(i, o = !1) {
        var n;
        i.full && (this.position = i.full.position, this.container.position = K(this.position), this.fallSound = this.playSound("airdrop_fall", {
            falloff: 1,
            maxRange: 128,
            dynamic: !0
        }));
        const r = E.lerp(.5, 1, i.height);
        if (o ? this.container.scale.set(r) : ((n = this.scaleAnim) == null || n.kill(), this.scaleAnim = new V(this.game, {
                target: this.container.scale,
                to: {
                    x: r,
                    y: r
                },
                duration: C.msPerTick
            })), i.height === 0) {
            this.playSound(this.game.map.terrain.getFloor(this.position) === "water" ? "airdrop_land_water" : "airdrop_land");
            const c = this.game.map.terrain.getFloor(this.position);
            _e[c].particles && this.game.particleManager.spawnParticles(6, () => ({
                frames: "ripple_particle",
                zIndex: R.Ground,
                position: yi(this.position, 6),
                lifetime: 1e3,
                speed: e.create(0, 0),
                scale: {
                    start: j(.45, .55),
                    end: j(2.95, 3.05)
                },
                alpha: {
                    start: j(.55, .65),
                    end: 0
                }
            }))
        }
    }
    destroy() {
        var i, o;
        super.destroy(), this.image.destroy(), (i = this.scaleAnim) == null || i.kill(), (o = this.fallSound) == null || o.stop()
    }
}
const st = class st {
    constructor(t, i, o) {
        s(this, "game");
        s(this, "startPosition");
        s(this, "endPosition");
        s(this, "image");
        s(this, "sound");
        s(this, "startTime", Date.now());
        this.game = t, this.startPosition = i, this.endPosition = e.add(this.startPosition, e.fromPolar(o, C.maxPosition * 2)), this.image = new O("airdrop_plane").setZIndex(R.Gas + 1).setRotation(o).setScale(2), this.sound = t.soundManager.play("airdrop_plane", {
            position: i,
            falloff: .5,
            maxRange: 256,
            dynamic: !0
        }), t.camera.addObject(this.image)
    }
    update() {
        const t = this.sound.position = e.lerp(this.startPosition, this.endPosition, (Date.now() - this.startTime) / (C.airdrop.flyTime * 2));
        this.image.setVPos(e.scale(t, N)), Me.distanceSquared(t, this.startPosition) > st.maxDistanceSquared && (this.destroy(), this.game.planes.delete(this))
    }
    destroy() {
        this.image.destroy()
    }
};
s(st, "maxDistanceSquared", (C.maxPosition * 2) ** 2);
let vt = st;
class Sa extends Re {
    constructor(i, o, r) {
        super(i, o);
        s(this, "type", D.SyncedParticle);
        s(this, "image", new O);
        s(this, "_alpha", 1);
        s(this, "_oldScale");
        s(this, "_lastScaleChange");
        s(this, "_scaleManuallySet", !1);
        s(this, "_scale", 0);
        this.container.addChild(this.image), this.updateFromData(r, !0)
    }
    get scale() {
        return this._scale
    }
    set scale(i) {
        this._scaleManuallySet && (this._oldScale = this._scale), this._scaleManuallySet = !0, this._lastScaleChange = Date.now(), this._scale = i
    }
    updateContainerScale() {
        this._oldScale === void 0 || this._lastScaleChange === void 0 || this.container.scale === void 0 || this.container.scale.set(E.lerp(this._oldScale, this._scale, Math.min((Date.now() - this._lastScaleChange) / C.msPerTick, 1)))
    }
    updateFromData(i, o = !1) {
        const r = i.full;
        if (r) {
            const {
                variant: n,
                definition: c
            } = r;
            this.image.setFrame(`${c.frame??c.idString}${n!==void 0?`_${n}`:""}`), c.tint && (this.image.tint = c.tint), this.container.zIndex = c.zIndex ?? R.ObstaclesLayer1
        }
        this.position = i.position, this.rotation = i.rotation, this._scale = i.scale ?? this._scale, this.container.alpha = this._alpha = i.alpha ?? this._alpha, (!this.game.console.getBuiltInCVar("cv_movement_smoothing") || o) && (this.container.position = K(this.position), this.container.rotation = this.rotation, this.container.scale.set(this._scale))
    }
    destroy() {
        super.destroy(), this.image.destroy()
    }
}
class ba extends Re {
    constructor(i, o, r) {
        super(i, o);
        s(this, "type", D.ThrowableProjectile);
        s(this, "image", new O);
        s(this, "waterOverlay", new O("water_overlay").setVisible(!1).setScale(.75).setTint(de.water));
        s(this, "_waterAnim");
        s(this, "radius");
        s(this, "floorType", "grass");
        this.container.addChild(this.image, this.waterOverlay), this.updateFromData(r)
    }
    updateFromData(i, o = !1) {
        var r;
        if (i.full && (this.image.setFrame(i.full.definition.animation.liveImage), this.radius = i.full.definition.hitboxRadius), this.position = i.position, this.rotation = i.rotation, i.airborne) this.container.zIndex = R.AirborneThrowables;
        else {
            const n = this.game.map.terrain.getFloor(this.position),
                c = _e[n].overlay;
            this.container.zIndex = c ? R.UnderwaterGroundedThrowables : R.GroundedThrowables, n !== this.floorType && (console.log(n), c && this.waterOverlay.setVisible(!0), (r = this._waterAnim) == null || r.kill(), this._waterAnim = new V(this.game, {
                target: this.waterOverlay,
                to: {
                    alpha: c ? 1 : 0
                },
                duration: 200,
                onComplete: () => {
                    c || this.waterOverlay.setVisible(!1)
                }
            })), this.floorType = n
        }(!this.game.console.getBuiltInCVar("cv_movement_smoothing") || o) && (this.container.position = K(this.position), this.container.rotation = this.rotation)
    }
    destroy() {
        super.destroy(), this.image.destroy()
    }
}
class xa {
    constructor(t) {
        s(this, "pixi");
        s(this, "container");
        s(this, "game");
        s(this, "position", e.create(0, 0));
        s(this, "_zoom", 48);
        s(this, "zoomTween");
        s(this, "shaking", !1);
        s(this, "shakeStart");
        s(this, "shakeDuration");
        s(this, "shakeIntensity");
        s(this, "width", 1);
        s(this, "height", 1);
        this.game = t, this.pixi = t.pixi, this.container = new ve, this.container.sortableChildren = !0, this.pixi.stage.addChild(this.container), this.resize(), this.pixi.renderer.on("resize", this.resize.bind(this))
    }
    get zoom() {
        return this._zoom
    }
    set zoom(t) {
        this._zoom = t, this.resize(!0)
    }
    resize(t = !1) {
        var r;
        this.width = this.pixi.screen.width, this.height = this.pixi.screen.height;
        const o = (this.height < this.width ? this.width : this.height) / 2560 * (48 / this.zoom);
        (r = this.zoomTween) == null || r.kill(), t ? this.zoomTween = new V(this.game, {
            target: this.container.scale,
            to: {
                x: o,
                y: o
            },
            duration: 800,
            ease: Q.cubicOut
        }) : this.container.scale.set(o)
    }
    update() {
        let t = this.position;
        if (this.shaking) {
            const o = this.shakeIntensity;
            t = e.addComponent(t, j(-o, o), j(-o, o)), Date.now() - this.shakeStart > this.shakeDuration && (this.shaking = !1)
        }
        const i = e.add(e.scale(t, this.container.scale.x), e.create(-this.width / 2, -this.height / 2));
        this.container.position.set(-i.x, -i.y)
    }
    shake(t, i) {
        this.game.console.getBuiltInCVar("cv_camera_shake_fx") && (this.shaking = !0, this.shakeStart = Date.now(), this.shakeDuration = t, this.shakeIntensity = i)
    }
    addObject(...t) {
        this.container.addChild(...t)
    }
}

function va() {
    const a = document.documentElement;
    typeof a.requestFullscreen == "function" ? a.requestFullscreen().catch() : typeof a.webkitRequestFullScreen == "function" && a.webkitRequestFullScreen().catch()
}

function ki(a) {
    const t = new Date(a * 1e3);
    let i = "";
    const o = t.getMinutes();
    return o > 0 && (i += `${o}m`), i += `${t.getSeconds()}s`, i
}

function ka(a) {
    const t = a.match(/\d+/);
    return t !== null && t[0].length === a.length
}
const be = 100 * 1e3,
    di = 512;
class za {
    constructor(t) {
        s(this, "state", he.Inactive);
        s(this, "currentDuration", 0);
        s(this, "oldPosition", e.create(0, 0));
        s(this, "lastPosition", e.create(0, 0));
        s(this, "position", e.create(0, 0));
        s(this, "newPosition", e.create(0, 0));
        s(this, "oldRadius", 2048);
        s(this, "lastRadius", 2048);
        s(this, "radius", 2048);
        s(this, "newRadius", 2048);
        s(this, "lastUpdateTime", Date.now());
        s(this, "game");
        s(this, "_ui", {
            msgText: d("#gas-msg-info"),
            msgContainer: d("#gas-msg"),
            timer: d("#gas-timer"),
            timerText: d("#gas-timer-text"),
            timerImg: d("#gas-timer-image")
        });
        this.game = t
    }
    updateFrom(t) {
        var r;
        const i = t.gas,
            o = (r = t.gasProgress) == null ? void 0 : r.value;
        if (i) {
            this.state = i.state, this.currentDuration = i.currentDuration, this.oldPosition = i.oldPosition, this.newPosition = i.newPosition, this.oldRadius = i.oldRadius, this.newRadius = i.newRadius;
            const [n, c] = [i.state === he.Inactive, i.state === he.Advancing], h = this.currentDuration - Math.round(this.currentDuration * (o ?? 1));
            let g = "";
            switch (this.state) {
                case he.Waiting: {
                    g = `Toxic gas advances in ${ki(h)}`;
                    break
                }
                case he.Advancing: {
                    g = "Toxic gas is advancing! Move to the safe zone";
                    break
                }
                case he.Inactive: {
                    g = "Waiting for players...";
                    break
                }
            }
            c ? (this._ui.timer.addClass("advancing"), this._ui.timerImg.attr("src", "./img/misc/gas-advancing-icon.svg")) : (this._ui.timer.removeClass("advancing"), this._ui.timerImg.attr("src", "./img/misc/gas-waiting-icon.svg")), (n || i.currentDuration !== 0) && !_t && (!this.game.gameOver || this.game.spectating) && (this._ui.msgText.text(g), this._ui.msgContainer.fadeIn(), n ? this._ui.msgText.css("color", "white") : (this._ui.msgText.css("color", "cyan"), setTimeout(() => d("#gas-msg").fadeOut(1e3), 5e3)))
        }
        if (o !== void 0) {
            const n = this.currentDuration - Math.round(this.currentDuration * o);
            this._ui.timerText.text(`${Math.floor(n/60)}:${n%60<10?"0":""}${n%60}`), this.state !== he.Advancing && (this.position = this.oldPosition, this.radius = this.oldRadius), this.state === he.Advancing && (this.lastPosition = e.clone(this.position), this.lastRadius = this.radius, this.position = e.lerp(this.oldPosition, this.newPosition, o), this.radius = E.lerp(this.oldRadius, this.newRadius, o), this.lastUpdateTime = Date.now())
        }
    }
}
class zi {
    constructor(t) {
        s(this, "_graphics");
        s(this, "_scale");
        this._scale = t, this._graphics = new xe, this._graphics.zIndex = R.Gas, this._graphics.clear().beginFill(de.gas).moveTo(-be, -be).lineTo(be, -be).lineTo(be, be).lineTo(-be, be).closePath().beginHole().moveTo(0, 1);
        for (let i = 1; i < di; i++) {
            const o = i / di,
                r = Math.sin(2 * Math.PI * o),
                n = Math.cos(2 * Math.PI * o);
            this._graphics.lineTo(r, n)
        }
        this._graphics.endHole().closePath().endFill()
    }
    get graphics() {
        return this._graphics
    }
    update(t) {
        let i, o;
        if (t.state === he.Advancing) {
            const c = E.clamp((Date.now() - t.lastUpdateTime) / C.msPerTick, 0, 1);
            i = e.lerp(t.lastPosition, t.position, c), o = E.lerp(t.lastRadius, t.radius, c)
        } else i = t.position, o = t.radius;
        const r = e.scale(i, this._scale);
        let n = o * this._scale;
        n < .1 && (n = 1, r.x += .5 * be), this._graphics.position.copyFrom(r), this._graphics.scale.set(n)
    }
}
class Ma {
    constructor(t) {
        s(this, "game");
        s(this, "expanded", !1);
        s(this, "visible", !0);
        s(this, "position", e.create(0, 0));
        s(this, "lastPosition", e.create(0, 0));
        s(this, "gasPos", e.create(0, 0));
        s(this, "gasRadius", 0);
        s(this, "gasGraphics", new xe);
        s(this, "objectsContainer", new ve);
        s(this, "container", new ve);
        s(this, "mask", new xe);
        s(this, "sprite", new Tt(Rt.EMPTY));
        s(this, "indicator", new O("player_indicator.svg"));
        s(this, "width", 0);
        s(this, "height", 0);
        s(this, "minimapWidth", 0);
        s(this, "minimapHeight", 0);
        s(this, "margins", e.create(0, 0));
        s(this, "gasRender", new zi(1));
        s(this, "placesContainer", new ve);
        s(this, "terrain", new ni(0, 0, 0, 0, 0, []));
        s(this, "pings", new Set);
        s(this, "border", new xe);
        s(this, "pingsContainer", new ve);
        s(this, "pingGraphics", new xe);
        s(this, "terrainGraphics", new xe);
        s(this, "debugGraphics", new xe);
        s(this, "borderContainer", d("#minimap-border"));
        this.game = t, t.pixi.stage.addChild(this.container), this.objectsContainer.mask = this.mask, this.container.addChild(this.objectsContainer), this.container.addChild(this.border), window.addEventListener("resize", this.resize.bind(this)), this.resize(), this.game.console.getBuiltInCVar("cv_minimap_minimized") && this.toggleMinimap(), this.objectsContainer.addChild(this.sprite, this.placesContainer, this.gasRender.graphics, this.gasGraphics, this.pingGraphics, this.pingsContainer, this.indicator).sortChildren(), this.borderContainer.on("click", i => {
            this.game.inputManager.isMobile && (this.switchToBigMap(), i.stopImmediatePropagation())
        }), d("#btn-close-minimap").on("pointerdown", i => {
            this.switchToSmallMap(), i.stopImmediatePropagation()
        })
    }
    updateFromPacket(t) {
        var I;
        console.log(`Joining game with seed: ${t.seed}`);
        const i = this.width = t.width,
            o = this.height = t.height,
            r = new l(e.create(t.oceanSize, t.oceanSize), e.create(t.width - t.oceanSize, t.height - t.oceanSize)),
            n = [];
        for (const w of t.rivers) n.push(new la(w.width, w.points, n, r));
        const c = this.terrain = new ni(i, o, t.oceanSize, t.beachSize, t.seed, n),
            h = this.terrainGraphics;
        h.clear();
        const g = new xe,
            u = c.beachHitbox.points,
            f = c.grassHitbox.points,
            x = (w, m, k) => {
                var Ye, Ee, Ot, Lt, $t, Vt;
                w.zIndex = R.Ground, w.beginFill(), w.fill.color = de.water.toNumber(), w.drawRect(0, 0, i * m, o * m);
                const M = 20 * m,
                    A = m === 1 ? u : u.map(G => e.scale(G, m));
                w.beginHole(), (Ye = w.drawRoundedShape) == null || Ye.call(w, A, M), w.endHole(), w.fill.color = de.beach.toNumber(), (Ee = w.drawRoundedShape) == null || Ee.call(w, A, M), w.beginHole();
                const q = m === 1 ? f : f.map(G => e.scale(G, m));
                (Ot = w.drawRoundedShape) == null || Ot.call(w, q, M), w.endHole();

                function ee(G) {
                    const je = G.length / 2;
                    return G.map((He, Te) => ({
                        x: He.x * m,
                        y: He.y * m,
                        radius: Te === je || Te === je - 1 ? 0 : M
                    }))
                }
                if (n.length) {
                    for (const G of n) w.fill.color = de.riverBank.toNumber(), (Lt = w.drawRoundedShape) == null || Lt.call(w, ee(G.bankHitbox.points), 0, !0);
                    for (const G of n) w.fill.color = de.water.toNumber(), ($t = w.drawRoundedShape) == null || $t.call(w, ee(G.waterHitbox.points), 0, !0);
                    w.drawRect(0, 0, i * m, o * m), w.beginHole(), (Vt = w.drawRoundedShape) == null || Vt.call(w, A, M), w.endHole()
                }
                w.lineStyle({
                    color: 0,
                    alpha: .1,
                    width: k
                });
                const le = C.gridSize * m,
                    ue = o * m,
                    Ve = o * m;
                for (let G = 0; G <= ue; G += le) w.moveTo(G, 0), w.lineTo(G, Ve);
                for (let G = 0; G <= Ve; G += le) w.moveTo(0, G), w.lineTo(ue, G);
                w.endFill(), w.lineStyle();
                for (const G of t.objects) {
                    if (G.type !== D.Building) continue;
                    const je = G.definition;
                    if (je.groundGraphics) {
                        const He = (Te, J) => {
                            if (J instanceof B || w.beginFill(Te), J instanceof l) {
                                const We = J.max.x - J.min.x,
                                    Mi = J.max.y - J.min.y;
                                w.drawRect(J.min.x * m, J.min.y * m, We * m, Mi * m)
                            } else if (J instanceof b) w.arc(J.position.x * m, J.position.y * m, J.radius * m, 0, Math.PI * 2);
                            else if (J instanceof ke) w.drawPolygon(J.points.map(We => e.scale(We, m)));
                            else if (J instanceof B)
                                for (const We of J.hitboxes) He(Te, We);
                            J instanceof B || (w.closePath(), w.endFill())
                        };
                        for (const Te of je.groundGraphics) He(Te.color, Te.hitbox.transform(G.position, 1, G.rotation))
                    }
                }
            };
        x(h, N, 6), x(g, 1, 2);
        const y = 5120,
            S = y * 2,
            v = i * N,
            T = o * N;
        h.beginFill(de.border), h.drawRect(-y, -y, v + S, y), h.drawRect(-y, T, v + S, y), h.drawRect(-y, -y, y, T + S), h.drawRect(v, -y, y, T + S), h.endFill(), this.game.camera.addObject(h);
        const z = new ve;
        z.addChild(g);
        for (const w of t.objects) switch (w.type) {
            case D.Obstacle: {
                const m = w.definition;
                let k = ((I = m.frames) == null ? void 0 : I.base) ?? m.idString;
                w.variation !== void 0 && (k += `_${w.variation+1}`);
                const M = new O(k).setVPos(w.position).setRotation(w.rotation).setZIndex(m.zIndex ?? R.ObstaclesLayer1);
                m.tint !== void 0 && M.setTint(m.tint), M.scale.set((w.scale ?? 1) * (1 / N)), z.addChild(M)
            }
            break;
            case D.Building: {
                const m = w.definition,
                    k = ze.orientationToRotation(w.rotation);
                for (const M of m.floorImages ?? []) {
                    const A = new O(M.key).setVPos(e.addAdjust(w.position, M.position, w.rotation)).setRotation(k + (M.rotation ?? 0)).setZIndex(R.BuildingsFloor);
                    M.tint !== void 0 && A.setTint(M.tint), A.scale = e.scale(M.scale ?? e.create(1, 1), 1 / N), z.addChild(A)
                }
                for (const M of m.ceilingImages ?? []) {
                    const A = new O(M.key).setVPos(e.addAdjust(w.position, M.position, w.rotation)).setRotation(k).setZIndex(m.ceilingZIndex ?? R.BuildingsCeiling);
                    A.scale.set(1 / N), M.tint !== void 0 && A.setTint(M.tint), z.addChild(A)
                }
                for (const M of m.floors ?? []) {
                    const A = M.hitbox.transform(w.position, 1, w.rotation);
                    this.terrain.addFloor(M.type, A)
                }
            }
            break
        }
        z.sortChildren();
        const _ = Ai.create({
            width: i,
            height: o,
            resolution: Pt.any ? 1 : 2
        });
        _.baseTexture.clearColor = de.grass, this.game.pixi.renderer.render(z, {
            renderTexture: _
        }), this.sprite.texture.destroy(!0), this.sprite.texture = _, z.destroy({
            children: !0,
            texture: !1
        }), this.placesContainer.removeChildren();
        for (const w of t.places) {
            const m = new gi(w.name, {
                fill: "white",
                fontFamily: "Inter",
                fontWeight: "600",
                stroke: "black",
                strokeThickness: 2,
                fontSize: 18,
                dropShadow: !0,
                dropShadowAlpha: .8,
                dropShadowColor: "black",
                dropShadowBlur: 2
            });
            m.alpha = .7, m.anchor.set(.5), m.position.copyFrom(w.position), this.placesContainer.addChild(m)
        }
        this.resize()
    }
    update() {
        if (this.pings.size > 0) {
            this.pingGraphics.clear(), this.pingGraphics.lineStyle({
                color: 65535,
                width: 5,
                cap: Et.ROUND
            });
            const t = Date.now();
            for (const i of this.pings) {
                i.initialized || (this.pingsContainer.addChild(i.image), i.initialized = !0);
                const o = E.lerp(0, 2048, (t - i.startTime) / 7e3);
                if (o >= 2048) {
                    this.pings.delete(i), this.game.addTimeout(() => {
                        i.image.destroy()
                    }, 5e3);
                    continue
                }
                this.pingGraphics.arc(i.position.x, i.position.y, o, 0, Math.PI * 2), this.pingGraphics.endFill()
            }
        }
        this.gasRender.update(this.game.gas), !(this.game.gas.state === he.Inactive || this.position.x === this.lastPosition.x && this.position.y === this.lastPosition.y && this.game.gas.newRadius === this.gasRadius && this.game.gas.newPosition.x === this.gasPos.x && this.game.gas.newPosition.y === this.gasPos.y) && (this.lastPosition = this.position, this.gasPos = this.game.gas.newPosition, this.gasRadius = this.game.gas.newRadius, this.gasGraphics.clear(), this.gasGraphics.lineStyle({
            color: 63993,
            width: 2,
            cap: Et.ROUND
        }), this.gasGraphics.moveTo(this.position.x, this.position.y).lineTo(this.gasPos.x, this.gasPos.y), this.gasGraphics.endFill(), this.gasGraphics.line.color = 16777215, this.gasGraphics.arc(this.gasPos.x, this.gasPos.y, this.gasRadius, 0, Math.PI * 2), this.gasGraphics.endFill())
    }
    resize() {
        if (this.border.visible = this.expanded, this.expanded) {
            const t = window.innerWidth,
                i = window.innerHeight,
                o = Math.min(i, t);
            this.container.scale.set(o / this.height), this.minimapWidth = this.sprite.width * this.container.scale.x, this.minimapHeight = this.sprite.height * this.container.scale.y, this.margins = e.create(t / 2 - this.minimapWidth / 2, i / 2 - this.minimapHeight / 2);
            const r = d("#btn-close-minimap");
            r.css("left", `${Math.min(this.margins.x+this.minimapWidth+16,t-(r.outerWidth()??0))}px`), this.indicator.scale.set(.2), this.border.clear(), this.border.fill.alpha = 0, this.border.lineStyle({
                width: 4,
                color: 0
            }), this.border.drawRect(-this.sprite.width / 2, 0, this.sprite.width, this.sprite.height)
        } else {
            if (!this.visible) return;
            const t = this.borderContainer[0].getBoundingClientRect(),
                i = parseInt(this.borderContainer.css("border-width"));
            this.minimapWidth = t.width - i * 2, this.minimapHeight = t.height - i * 2, this.margins = e.create(t.left + i, t.top + i), window.innerWidth > 1200 ? this.container.scale.set(1 / 1.25) : this.container.scale.set(1 / 2), this.indicator.scale.set(.1)
        }
        this.mask.clear(), this.mask.beginFill(0), this.mask.drawRect(this.margins.x, this.margins.y, this.minimapWidth, this.minimapHeight), this.updatePosition(), this.updateTransparency();
        for (const t of this.placesContainer.children) t.scale.set(1 / this.container.scale.x)
    }
    toggle() {
        this.expanded ? this.switchToSmallMap() : this.switchToBigMap()
    }
    setPosition(t) {
        this.position = e.clone(t), this.indicator.setVPos(t), this.updatePosition()
    }
    updatePosition() {
        if (this.expanded) {
            this.container.position.set(window.innerWidth / 2, window.innerHeight / 2 - this.minimapHeight / 2), this.objectsContainer.position.set(-this.width / 2, 0);
            return
        }
        const t = e.clone(this.position);
        t.x -= (this.minimapWidth / 2 + this.margins.x) / this.container.scale.x, t.y -= (this.minimapHeight / 2 + this.margins.y) / this.container.scale.y, this.container.position.set(0, 0), this.objectsContainer.position.copyFrom(e.scale(t, -1))
    }
    switchToBigMap() {
        this.expanded = !0, this.container.visible = !0, this.borderContainer.hide(), d("#scopes-container").hide(), d("#spectating-container").hide(), d("#weapons-container").hide(), d("#items-container").hide(), d("#gas-msg-info").hide(), d("#btn-close-minimap").show(), d("#ui-kill-leader").hide(), d("#center-bottom-container").hide(), d("#kill-counter").show(), this.resize()
    }
    switchToSmallMap() {
        this.expanded = !1, d("#btn-close-minimap").hide(), d("#center-bottom-container").show(), d("#weapons-container").show(), d("#items-container").show(), d("#gas-msg-info").show(), d("#scopes-container").show(), this.game.spectating && d("#spectating-container").show();
        const t = d(window).width();
        if (t && t > 1200 && d("#ui-kill-leader").show(), d("#kill-counter").hide(), !this.visible) {
            this.container.visible = !1;
            return
        }
        this.borderContainer.show(), this.resize()
    }
    updateTransparency() {
        this.container.alpha = this.game.console.getBuiltInCVar(this.expanded ? "cv_map_transparency" : "cv_minimap_transparency")
    }
    toggleMinimap(t = !1) {
        this.visible = !this.visible, this.switchToSmallMap(), this.container.visible = this.visible, this.borderContainer.toggle(this.visible), this.game.console.setBuiltInCVar("cv_minimap_minimized", !this.visible), t || d("#toggle-hide-minimap").prop("checked", !this.visible)
    }
}
class Ra {
    constructor(t) {
        s(this, "position");
        s(this, "startTime");
        s(this, "image");
        s(this, "initialized");
        this.position = t, this.startTime = Date.now(), this.image = new O("airdrop_ping").setVPos(t), this.initialized = !1
    }
}
const kt = [void 0, '<path d="m2.5135417.52916667v1.98437503h-1.98437503v.2645833h1.98437503v1.9843749h.2645833v-1.9843749h1.9843749v-.2645833h-1.9843749v-1.98437503z"/>', '<path d="m2.441453.5291666v1.453658h.4092773v-1.453658zm-1.1983765.7002157v1.0924397h.344165v-.7482747h.7482748v-.344165zm1.7135905 0v.344165h.7482747v.7482747h.3441651v-1.0924397zm-2.4406779 1.1983764v.4092774h1.453658v-.4092774zm2.8060303 0v.4092774h1.453658v-.4092774zm-2.0789429.5152141v1.0924397h1.0924398v-.344165h-.7482748v-.7482747zm2.4618652 0v.7482747h-.7482747v.344165h1.0924398v-1.0924397zm-1.2634887.3658691v1.453658h.4092773v-1.453658z"/>', '<path d="m 2.6429911,0.52916667 c -0.073289,0 -0.1322916,0.059002 -0.1322916,0.13229166 V 1.0645345 C 1.7411327,1.1286256 1.1257834,1.7439749 1.0616923,2.5135417 H 0.66430054 c -0.0732897,0 -0.13229166,0.059002 -0.13229166,0.1322916 0,0.073289 0.059002,0.1322917 0.13229166,0.1322917 H 1.0611755 c 0.063612,0.7700628 0.6796027,1.38592 1.449524,1.4500406 v 0.4020427 c 0,0.07329 0.059002,0.1322916 0.1322916,0.1322916 0.073289,0 0.1322917,-0.059002 0.1322917,-0.1322916 V 4.2286824 C 3.5457002,4.1650414 4.1621991,3.5485424 4.2258402,2.778125 h 0.4015259 c 0.07329,0 0.1322916,-0.059002 0.1322916,-0.1322917 0,-0.073289 -0.059002,-0.1322916 -0.1322916,-0.1322916 H 4.2253234 C 4.1612028,1.7436204 3.5453456,1.1276296 2.7752828,1.0640177 V 0.66145833 c 0,-0.0732897 -0.059002,-0.13229166 -0.1322917,-0.13229166 z M 2.7752828,1.3286011 c 0.6261544,0.061742 1.1218721,0.5587361 1.183907,1.1849406 H 3.8336161 c -0.07329,0 -0.1322917,0.059002 -0.1322917,0.1322916 0,0.073289 0.059002,0.1322917 0.1322917,0.1322917 H 3.9591898 C 3.8975952,3.4046039 3.4017617,3.9004374 2.7752828,3.962032 V 3.8364583 c 0,-0.07329 -0.059002,-0.1322917 -0.1322917,-0.1322917 -0.073289,0 -0.1322916,0.059002 -0.1322916,0.1322917 V 3.962032 C 1.884495,3.8999971 1.3875006,3.4042794 1.3257589,2.778125 h 0.1322916 c 0.07329,0 0.1322917,-0.059002 0.1322917,-0.1322917 0,-0.073289 -0.059002,-0.1322916 -0.1322917,-0.1322916 H 1.3262756 C 1.3884739,1.8876926 1.8848504,1.3913161 2.5106995,1.3291178 v 0.1260905 c 0,0.07329 0.059002,0.1322917 0.1322916,0.1322917 0.073289,0 0.1322917,-0.059002 0.1322917,-0.1322917 z M 2.6455749,2.4634155 A 0.182548,0.182548 0 0 0 2.4631571,2.6458333 0.182548,0.182548 0 0 0 2.6455749,2.8282511 0.182548,0.182548 0 0 0 2.8285095,2.6458333 0.182548,0.182548 0 0 0 2.6455749,2.4634155 Z" />', '<path d="m.94981276.52916708-.42064637.43201478 1.45003981 1.44590634.4278807-.0000001.0000001-.4247802zm3.38067114-.00000056-1.4459065 1.45004098-.0000002.4278807h.4247802l1.4531412-1.45727563zm-2.348177 2.35541208-1.45314118 1.4572756.43201471.420646 1.44590657-1.4500408.0000001-.4278808zm.9022702-.0000002-.0000001.4247803 1.4572745 1.453141.4206494-.4320118-1.4500399-1.4459063z"/>', '<path d="M 2.9786295,0.55397134 V 0.92500812 A 1.7565619,1.7565619 0 0 1 4.3651082,2.3114868 H 4.7366617 A 2.1186512,2.1186512 0 0 0 2.9786295,0.55397134 Z M 2.3104533,0.5560384 A 2.1186512,2.1186512 0 0 0 0.55500485,2.3114868 H 0.92449136 A 1.7565619,1.7565619 0 0 1 2.3104533,0.92552489 Z M 2.6447998,1.3358358 A 1.3099111,1.3099111 0 0 0 1.3348022,2.6458333 1.3099111,1.3099111 0 0 0 1.526005,3.3238281 L 1.8334798,3.0163533 a 0.89495105,0.89495105 0 0 1 -0.083716,-0.37052 0.89495105,0.89495105 0 0 1 0.8950358,-0.8950358 0.89495105,0.89495105 0 0 1 0.372587,0.081649 L 3.3238281,1.526005 A 1.3099111,1.3099111 0 0 0 2.6447998,1.3358358 Z M 3.7641113,1.9662882 3.45767,2.2727295 A 0.89495105,0.89495105 0 0 1 3.5398356,2.6458333 0.89495105,0.89495105 0 0 1 2.6447998,3.5408691 0.89495105,0.89495105 0 0 1 2.273763,3.4566365 L 1.9662882,3.7641113 A 1.3099111,1.3099111 0 0 0 2.6447998,3.9558308 1.3099111,1.3099111 0 0 0 3.9547973,2.6458333 1.3099111,1.3099111 0 0 0 3.7641113,1.9662882 Z M 2.6447998,2.4029541 A 0.24300306,0.24300306 0 0 0 2.4019205,2.6458333 0.24300306,0.24300306 0 0 0 2.6447998,2.8887125 0.24300306,0.24300306 0 0 0 2.887679,2.6458333 0.24300306,0.24300306 0 0 0 2.6447998,2.4029541 Z M 0.55500485,2.979663 A 2.1186512,2.1186512 0 0 0 2.3104533,4.7356282 V 4.3661417 A 1.7565619,1.7565619 0 0 1 0.92397457,2.979663 Z m 3.81062005,0 A 1.7565619,1.7565619 0 0 1 2.9786295,4.3666585 V 4.7376952 A 2.1186512,2.1186512 0 0 0 4.7366617,2.979663 Z" />', '<path d="M 2.6458332,0.52916667 A 2.1166668,2.1166668 0 0 0 0.52916662,2.6458334 2.1166668,2.1166668 0 0 0 2.6458332,4.7624999 2.1166668,2.1166668 0 0 0 4.7624999,2.6458334 2.1166668,2.1166668 0 0 0 2.6458332,0.52916667 Z m 0,0.38602294 A 1.7304204,1.7304204 0 0 1 3.7243203,1.2929443 L 2.6458332,2.3714315 1.5694131,1.2955281 A 1.7304204,1.7304204 0 0 1 2.6458332,0.91518961 Z M 3.9987222,1.5673463 A 1.7304204,1.7304204 0 0 1 4.3764769,2.6458334 1.7304204,1.7304204 0 0 1 3.9987222,3.7243205 L 2.920235,2.6458334 Z M 1.2950113,1.5699301 2.3709146,2.6458334 1.2950113,3.7217367 A 1.7304204,1.7304204 0 0 1 0.91518952,2.6458334 1.7304204,1.7304204 0 0 1 1.2950113,1.5699301 Z M 2.6453164,2.9202352 3.7243203,3.9987224 A 1.7304204,1.7304204 0 0 1 2.6458332,4.3764771 1.7304204,1.7304204 0 0 1 1.5694131,3.9961386 Z" />', '<path id="path1" d="M 2.6458333,0.52916665 A 2.1166674,2.1166674 0 0 0 0.52916665,2.6458333 2.1166674,2.1166674 0 0 0 2.6458333,4.7624999 2.1166674,2.1166674 0 0 0 4.7624999,2.6458333 2.1166674,2.1166674 0 0 0 2.6458333,0.52916665 Z m 0,0.37310384 A 1.7437392,1.7437392 0 0 1 4.3893961,2.6458333 1.7437392,1.7437392 0 0 1 2.6458333,4.3893961 1.7437392,1.7437392 0 0 1 0.90227049,2.6458333 1.7437392,1.7437392 0 0 1 2.6458333,0.90227049 Z M 2.5460978,2.3859008 v 0.160197 h -0.160197 v 0.199471 h 0.160197 v 0.1601969 h 0.199471 V 2.7455688 H 2.9057657 V 2.5460978 H 2.7455688 v -0.160197 z" />', '<path d="M 2.3796997,0.52916665 V 1.7600992 H 2.9119669 V 0.52916665 Z M 2.9993001,0.83405759 V 1.2236979 A 1.4707091,1.4707091 0 0 1 4.0731363,2.2923665 H 4.4617431 A 1.8502945,1.8502945 0 0 0 2.9993001,0.83405759 Z M 2.2923665,0.83457435 A 1.8502945,1.8502945 0 0 0 0.83405759,2.2923665 H 1.2226644 A 1.4707091,1.4707091 0 0 1 2.2923665,1.2247314 Z M 0.52916665,2.3796997 V 2.9119669 H 1.7600992 V 2.3796997 Z m 3.00240065,0 V 2.9119669 H 4.7624999 V 2.3796997 Z M 0.83405759,2.9993001 A 1.8502945,1.8502945 0 0 0 2.2944335,4.457609 V 4.0674519 A 1.4707091,1.4707091 0 0 1 1.2226644,2.9993001 Z m 3.23494461,0 A 1.4707091,1.4707091 0 0 1 3.0013671,4.0664184 v 0.390157 A 1.8502945,1.8502945 0 0 0 4.457609,2.9993001 Z M 2.3796997,3.5315673 V 4.7624999 H 2.9119669 V 3.5315673 Z" />', '<path d="M 2.6458333,0.20153806 0.52916665,1.4236857 V 3.8679809 L 2.6458333,5.0901285 4.7624999,3.8679809 V 1.4236857 Z m 0,0.47077229 L 4.1692545,1.55236 2.661853,2.4225911 1.137915,1.5430582 Z M 0.93689369,1.8872233 2.4499796,2.7610717 V 4.5061848 L 0.93689369,3.6323363 Z M 4.3547729,1.90531 v 1.7270263 l -1.506368,0.8702311 v -1.727543 z" />', '<path d="M 2.4179402,0.31677652 1.6190226,1.7006713 1.0454142,1.3694254 0.74259031,1.8939412 1.3156819,2.2251871 0.52916665,3.5878946 1.1275797,3.2426961 2.4179402,1.0076904 Z m 0.4557861,0 V 1.0076904 L 4.1640868,3.2426961 4.7624999,3.5878946 3.9759846,2.2251871 4.5490762,1.8939412 4.2462523,1.3694254 3.672644,1.7006713 Z M 2.6458333,2.4024373 c -0.1344125,2.74e-5 -0.2433686,0.1089835 -0.243396,0.243396 2.74e-5,0.1344125 0.1089835,0.2433686 0.243396,0.243396 0.1344125,-2.74e-5 0.2433686,-0.1089835 0.243396,-0.243396 C 2.8892019,2.5114208 2.7802458,2.4024647 2.6458333,2.4024373 Z M 1.3192993,3.6581746 0.75705971,3.9832193 H 2.3430094 V 4.665865 H 2.9486572 V 3.9832193 H 4.5346068 L 3.9723673,3.6581746 Z" />', '<path d="M 2.4318929,0.52916665 V 0.83095701 A 1.8305234,1.8305234 0 0 0 0.83095701,2.4318929 H 0.52916665 V 2.8597737 H 0.83095701 A 1.8305234,1.8305234 0 0 0 2.4318929,4.4607095 V 4.7624999 H 2.8597737 V 4.4607095 A 1.8305234,1.8305234 0 0 0 4.4607095,2.8597737 H 4.7624999 V 2.4318929 H 4.4607095 A 1.8305234,1.8305234 0 0 0 2.8597737,0.83095701 V 0.52916665 Z M 2.8597737,1.2407511 A 1.4216013,1.4216013 0 0 1 4.0509154,2.4318929 H 2.9739786 a 0.39187496,0.39187496 0 0 1 0.063562,0.2139404 0.39187496,0.39187496 0 0 1 -0.063562,0.2139404 H 4.0509154 A 1.4216013,1.4216013 0 0 1 2.8597737,4.0509154 V 2.9739786 A 0.39187496,0.39187496 0 0 1 2.6458333,3.0375406 0.39187496,0.39187496 0 0 1 2.4318929,2.9739786 v 1.0764201 a 1.4216013,1.4216013 0 0 1 -1.190625,-1.190625 h 1.07642 A 0.39187496,0.39187496 0 0 1 2.2541259,2.6458333 0.39187496,0.39187496 0 0 1 2.3176879,2.4318929 h -1.07642 a 1.4216013,1.4216013 0 0 1 1.190625,-1.190625 v 1.07642 a 0.39187496,0.39187496 0 0 1 0.2139404,-0.063562 0.39187496,0.39187496 0 0 1 0.2139404,0.063562 z M 2.6458333,2.3430094 A 0.30300418,0.30300418 0 0 0 2.3430094,2.6458333 0.30300418,0.30300418 0 0 0 2.6458333,2.9486572 0.30300418,0.30300418 0 0 0 2.9486572,2.6458333 0.30300418,0.30300418 0 0 0 2.6458333,2.3430094 Z" />', '<path d="M 1.3519537,2.2068079 C 1.357793,2.1741734 1.637807,2.2525412 1.9879066,2.1096426 1.6258102,1.556659 0.50167915,1.0305177 0.50167915,1.0305177 L 1.0118737,0.47138692 C 1.3086718,0.58971178 1.5818046,0.75145785 1.8384366,0.93722354 2.2934379,1.2785435 2.4561453,1.5675021 2.4905588,1.5940244 2.5158608,1.6135334 2.6088899,1.1368476 2.6088899,1.1368476 l 0.097282,0.00117 c 0,0 0.2137755,1.0403756 -0.029994,1.5078154 C 2.2339244,2.5140167 1.7847855,2.4073078 1.3338091,2.3082146 Z" />'];

function mi(a, t, i, o, r) {
    const n = kt[a];
    return n ? `data:image/svg+xml,${encodeURIComponent(`<svg fill="${t}" height="${i}" width="${i}" stroke="${o}" stroke-width="${r}" viewBox="0 0 5.2916665 5.2916666" xmlns="http://www.w3.org/2000/svg">${n}</svg>`)}` : "crosshair"
}

function Ta(a) {
    const t = d("#username-input"),
        i = [{
            name: "123OP",
            link: "https://www.youtube.com/@123op."
        }, {
            name: "TEAMFIGHTER 27",
            link: "https://www.youtube.com/@TEAMFIGHTER27"
        }, {
            name: "NAMERIO",
            link: "https://www.youtube.com/@NAMERIO1"
        }, {
            name: "AWMZ",
            link: "https://www.youtube.com/@AWMZ6000"
        }, {
            name: "Ukraines dude",
            link: "https://www.youtube.com/@Ukrainesdude"
        }, {
            name: "monet",
            link: "https://www.youtube.com/@stardust_737"
        }, {
            name: "Tuncres",
            link: "https://www.youtube.com/@Tuncres2022"
        }, {
            name: "silverdotware",
            link: "https://www.youtube.com/@silverdotware"
        }, {
            name: "Pablo_Fan_",
            link: "https://www.youtube.com/@Pablo_Fan_"
        }, {
            name: "g0dak",
            link: "https://www.youtube.com/@g0dak"
        }],
        o = i[Math.floor(Math.random() * i.length)];
    d("#youtube-featured-name").text(o.name), d("#youtube-featured-content").attr("href", o.link);
    const r = [{
            name: "ikou",
            link: "https://www.twitch.tv/ikou_yt"
        }],
        n = r[Math.floor(Math.random() * r.length)];
    d("#twitch-featured-name").text(n.name), d("#twitch-featured-content").attr("href", n.link);
    const c = () => d("#splash-rotate-message").toggle(window.innerWidth < window.innerHeight);
    c(), d(window).on("resize", c);
    const h = d("#game-menu"),
        g = d("#settings-menu");
    t.val(a.console.getBuiltInCVar("cv_player_name")), t.on("input", () => {
        t.val(t.val().replace(/[\u201c\u201d\u201f]/g, '"').replace(/[\u2018\u2019\u201b]/g, "'").replace(/[\u2013\u2014]/g, "-").replace(/[^\x00-\x7F]/g, "")), a.console.setBuiltInCVar("cv_player_name", t.val())
    }), Li("#server-select");
    const u = d("#server-select");
    u.on("change", () => {
        const m = u.val();
        m !== void 0 && a.console.setBuiltInCVar("cv_region", m)
    });
    const f = d("#btn-rules");
    a.console.getBuiltInCVar("cv_rules_acknowledged") || f.removeClass("btn-secondary").addClass("highlighted"), f.on("click", () => {
        a.console.setBuiltInCVar("cv_rules_acknowledged", !0), location.href = "/rules/"
    }), d("#btn-quit-game").on("click", () => {
        a.endGame()
    }), d("#btn-menu").on("click", () => {
        a.endGame()
    }), d("#btn-play-again").on("click", () => {
        a.endGame(), d("#btn-play-solo").trigger("click")
    });
    const x = m => {
        const k = new Bt;
        k.spectateAction = m, a.sendPacket(k)
    };
    d("#btn-spectate").on("click", () => {
        x(se.BeginSpectating), a.spectating = !0, a.map.indicator.setFrame("player_indicator")
    }), d("#btn-spectate-previous").on("click", () => {
        x(se.SpectatePrevious)
    }), d("#btn-spectate-kill-leader").on("click", () => {
        x(se.SpectateKillLeader)
    }), d("#btn-report").on("click", () => {
        confirm(`Are you sure you want to report this player?
Players should only be reported for teaming or hacking.
Video evidence is required.`) && x(se.Report)
    }), d("#btn-spectate-next").on("click", () => {
        x(se.SpectateNext)
    }), d("#btn-resume-game").on("click", () => h.hide()), d("#btn-fullscreen").on("click", () => {
        va(), d("#game-menu").hide()
    }), $i.on("keydown", m => {
        m.key === "Escape" && (d("canvas").hasClass("active") && !a.console.isOpen && (h.fadeToggle(250), g.hide()), a.console.isOpen = !1)
    }), d("#btn-settings").on("click", () => {
        g.fadeToggle(250), g.removeClass("in-game")
    }), d("#btn-settings-game").on("click", () => {
        h.hide(), g.fadeToggle(250), g.addClass("in-game")
    }), d("#close-settings").on("click", () => {
        g.fadeOut(250)
    });
    const y = d("#customize-menu");
    d("#btn-customize").on("click", () => y.fadeToggle(250)), d("#close-customize").on("click", () => y.fadeOut(250)), d("#close-report").on("click", () => d("#report-modal").fadeOut(250));
    const S = m => {
        d("#skin-base").css("background-image", `url("./img/game/skins/${m}_base.svg")`), d("#skin-left-fist, #skin-right-fist").css("background-image", `url("./img/game/skins/${m}_fist.svg")`)
    };
    S(a.console.getBuiltInCVar("cv_loadout_skin"));
    for (const m of ot) {
        if (m.notInLoadout ?? (m.roleRequired !== void 0 && m.roleRequired !== a.console.getBuiltInCVar("dv_role"))) continue;
        const k = d(`<div id="skin-${m.idString}" class="skins-list-item-container">
  <div class="skins-list-item">
    <div class="skin-base" style="background-image: url('./img/game/skins/${m.idString}_base.svg')"></div>
    <div class="skin-left-fist" style="background-image: url('./img/game/skins/${m.idString}_fist.svg')"></div>
    <div class="skin-right-fist" style="background-image: url('./img/game/skins/${m.idString}_fist.svg')"></div>
  </div>
  <span class="skin-name">${m.name}</span>
</div>`);
        k.on("click", function() {
            a.console.setBuiltInCVar("cv_loadout_skin", m.idString), d(this).addClass("selected").siblings().removeClass("selected"), S(m.idString)
        }), d("#skins-list").append(k)
    }
    d(`#skin-${a.console.getBuiltInCVar("cv_loadout_skin")}`).addClass("selected");
    let v;
    for (const m of Pe.definitions) {
        const k = d(`<div id="emote-${m.idString}" class="emotes-list-item-container">
  <div class="emotes-list-item" style="background-image: url('/img/game/emotes/${m.idString}.svg')"></div>
  <span class="emote-name">${m.name}</span>
</div>`);
        k.on("click", function() {
            v !== void 0 && (a.console.setBuiltInCVar(`cv_loadout_${v}_emote`, m.idString), d(this).addClass("selected").siblings().removeClass("selected"), d(`#emote-customize-wheel > .emote-${v}`).css("background-image", `url("./img/game/emotes/${m.idString}.svg")`))
        }), d("#emotes-list").append(k)
    }
    for (const m of ["top", "right", "bottom", "left"]) {
        const k = a.console.getBuiltInCVar(`cv_loadout_${m}_emote`);
        d(`#emote-customize-wheel > .emote-${m}`).css("background-image", `url("./img/game/emotes/${k}.svg")`).on("click", () => {
            v !== m ? (v = m, d("#emote-customize-wheel").css("background-image", `url("./img/misc/emote_wheel_highlight_${m}.svg"), url("/img/misc/emote_wheel.svg")`), d(".emotes-list-item-container").removeClass("selected").css("cursor", "pointer"), d(`#emote-${k}`).addClass("selected")) : (v = void 0, d("#emote-customize-wheel").css("background-image", 'url("./img/misc/emote_wheel.svg")'), d(".emotes-list-item-container").removeClass("selected").css("cursor", "default"))
        })
    }

    function T() {
        const m = a.console.getBuiltInCVar("cv_crosshair_size"),
            k = mi(a.console.getBuiltInCVar("cv_loadout_crosshair"), a.console.getBuiltInCVar("cv_crosshair_color"), m, a.console.getBuiltInCVar("cv_crosshair_stroke_color"), a.console.getBuiltInCVar("cv_crosshair_stroke_size")),
            M = `url("${k}") ${m/2} ${m/2}, crosshair`;
        d("#crosshair-image").css({
            backgroundImage: `url("${k}")`,
            width: m,
            height: m
        }), d("#crosshair-controls").toggleClass("disabled", !kt[a.console.getBuiltInCVar("cv_loadout_crosshair")]), d("#crosshair-preview, #game-ui").css({
            cursor: M
        })
    }
    T(), kt.forEach((m, k) => {
        const M = d(`
    <div id="crosshair-${k}" class="crosshairs-list-item-container">
        <div class="crosshairs-list-item"></div>
    </div>`);
        M.find(".crosshairs-list-item").css({
            backgroundImage: `url("${mi(k,"#fff",a.console.getBuiltInCVar("cv_crosshair_size"),"#0",0)}")`,
            "background-size": "contain",
            "background-repeat": "no-repeat"
        }), M.on("click", function() {
            a.console.setBuiltInCVar("cv_loadout_crosshair", k), T(), d(this).addClass("selected").siblings().removeClass("selected")
        }), d("#crosshairs-list").append(M)
    }), d(`#crosshair-${a.console.getBuiltInCVar("cv_loadout_crosshair")}`).addClass("selected"), z("#slider-crosshair-size", "cv_crosshair_size", m => {
        a.console.setBuiltInCVar("cv_crosshair_size", 20 * m), T()
    }), d("#slider-crosshair-size").val(a.console.getBuiltInCVar("cv_crosshair_size") / 20), z("#slider-crosshair-stroke-size", "cv_crosshair_stroke_size", () => {
        T()
    }), d("#slider-crosshair-stroke-size").val(a.console.getBuiltInCVar("cv_crosshair_stroke_size")), d("#crosshair-color-picker").on("input", m => {
        a.console.setBuiltInCVar("cv_crosshair_color", m.target.value), T()
    }).val(a.console.getBuiltInCVar("cv_crosshair_color")), d("#crosshair-stroke-picker").on("input", m => {
        a.console.setBuiltInCVar("cv_crosshair_stroke_color", m.target.value), T()
    }).val(a.console.getBuiltInCVar("cv_crosshair_stroke_color")), d("#game-ui").on("contextmenu", m => {
        m.preventDefault()
    });

    function z(m, k, M) {
        const A = d(m)[0];
        A || console.error("Invalid element id"), A.addEventListener("input", () => {
            const q = +A.value;
            a.console.setBuiltInCVar(k, q), M == null || M(q)
        }), A.value = a.console.getBuiltInCVar(k).toString()
    }

    function _(m, k, M) {
        const A = d(m)[0];
        A.addEventListener("input", () => {
            const q = A.checked;
            a.console.setBuiltInCVar(k, q), M == null || M(q)
        }), A.checked = a.console.getBuiltInCVar(k)
    }
    _("#toggle-scope-looping", "cv_loop_scope_selection"), _("#toggle-anonymous-player", "cv_anonymize_player_names"), z("#slider-music-volume", "cv_music_volume", m => {
        a.music.volume = m
    }), z("#slider-sfx-volume", "cv_sfx_volume", m => {
        a.soundManager.volume = m
    }), z("#slider-master-volume", "cv_master_volume", m => {
        Ie.volumeAll = m
    }), Ie.volumeAll = a.console.getBuiltInCVar("cv_master_volume"), _("#toggle-old-music", "cv_use_old_menu_music"), _("#toggle-camera-shake", "cv_camera_shake_fx"), _("#toggle-fps", "pf_show_fps", m => {
        d("#fps-counter").toggle(m)
    }), d("#fps-counter").toggle(a.console.getBuiltInCVar("pf_show_fps")), _("#toggle-ping", "pf_show_ping", m => {
        d("#ping-counter").toggle(m)
    }), d("#ping-counter").toggle(a.console.getBuiltInCVar("pf_show_ping")), _("#toggle-coordinates", "pf_show_pos", m => {
        d("#coordinates-hud").toggle(m)
    }), d("#coordinates-hud").toggle(a.console.getBuiltInCVar("pf_show_pos"));
    {
        const m = d("#toggle-text-kill-feed")[0];
        m.addEventListener("input", () => {
            a.console.setBuiltInCVar("cv_killfeed_style", m.checked ? "text" : "icon")
        }), m.checked = a.console.getBuiltInCVar("cv_killfeed_style") === "text"
    }
    _("#toggle-antialias", "cv_antialias"), _("#toggle-movement-smoothing", "cv_movement_smoothing"), _("#toggle-responsive-rotation", "cv_responsive_rotation"), _("#toggle-mobile-controls", "mb_controls_enabled"), z("#slider-joystick-size", "mb_joystick_size"), z("#slider-joystick-transparency", "mb_joystick_transparency"), z("#slider-minimap-transparency", "cv_minimap_transparency", () => {
        a.map.updateTransparency()
    }), z("#slider-big-map-transparency", "cv_map_transparency", () => {
        a.map.updateTransparency()
    }), _("#toggle-hide-minimap", "cv_minimap_minimized", () => {
        a.map.toggleMinimap(!0)
    }), _("#toggle-leave-warning", "cv_leave_warning"), _("#toggle-hide-rules", "cv_hide_rules_button", m => {
        d("#btn-rules, #rules-close-btn").toggle(!m)
    }), f.toggle(!a.console.getBuiltInCVar("cv_hide_rules_button")), d(".checkbox-setting").has("#toggle-hide-rules").toggle(a.console.getBuiltInCVar("cv_rules_acknowledged")), d("#rules-close-btn").on("click", () => {
        d("#btn-rules, #rules-close-btn").hide(), a.console.setBuiltInCVar("cv_hide_rules_button", !0), d("#toggle-hide-rules").prop("checked", !0)
    }).toggle(a.console.getBuiltInCVar("cv_rules_acknowledged") && !a.console.getBuiltInCVar("cv_hide_rules_button")), d("#import-settings-btn").on("click", () => {
        if (!confirm("This option will overwrite all settings and reload the page. Continue?")) return;
        const m = () => {
            alert("Invalid config.")
        };
        try {
            const k = prompt("Enter a config:");
            if (!k) {
                m();
                return
            }
            const M = JSON.parse(k);
            if (typeof M != "object" || !("variables" in M)) {
                m();
                return
            }
            localStorage.setItem("suroi_config", k), alert("Settings loaded successfully."), window.location.reload()
        } catch {
            m()
        }
    }), d("#export-settings-btn").on("click", () => {
        const m = localStorage.getItem("suroi_config"),
            k = () => {
                alert('Unable to copy settings. To export settings manually, open the dev tools with Ctrl+Shift+I and type in the following: localStorage.getItem("suroi_config")')
            };
        if (m === null) {
            k();
            return
        }
        navigator.clipboard.writeText(m).then(() => {
            alert("Settings copied to clipboard.")
        }).catch(k)
    }), d("#reset-settings-btn").on("click", () => {
        confirm("This option will reset all settings and reload the page. Continue?") && confirm("Are you sure? This action cannot be undone.") && (localStorage.removeItem("suroi_config"), window.location.reload())
    });
    const I = C.player.maxWeapons;
    for (let m = 0; m < I; m++) {
        const k = d(`#weapon-slot-${m+1}`);
        k[0].addEventListener("pointerdown", M => {
            k.hasClass("has-item") && (M.stopImmediatePropagation(), a.inputManager.addAction({
                type: M.button === 2 ? L.DropItem : L.EquipItem,
                slot: m
            }))
        })
    }
    for (const m of me) d("#scopes-container").append(`
        <div class="inventory-slot item-slot" id="${m.idString}-slot" style="display: none;">
            <img class="item-image" src="./img/game/loot/${m.idString}.svg" draggable="false">
            <div class="item-tooltip">${m.name.split(" ")[0]}</div>
        </div>`), d(`#${m.idString}-slot`)[0].addEventListener("pointerdown", k => {
        a.inputManager.addAction({
            type: L.UseItem,
            item: m
        }), k.stopPropagation()
    });
    for (const m of Ke) d("#healing-items-container").append(`
        <div class="inventory-slot item-slot" id="${m.idString}-slot">
            <img class="item-image" src="./img/game/loot/${m.idString}.svg" draggable="false">
            <span class="item-count" id="${m.idString}-count">0</span>
            <div class="item-tooltip">
                ${m.name}
                <br>
                Restores ${m.restoreAmount}${m.healType===Ct.Adrenaline?"% adrenaline":" health"}
            </div>
        </div>`), d(`#${m.idString}-slot`)[0].addEventListener("pointerdown", k => {
        a.inputManager.addAction({
            type: L.UseItem,
            item: m
        }), k.stopPropagation()
    });
    for (const m of lt) m.ephemeral !== !0 && d(`#${m.hideUnlessPresent?"special-":""}ammo-container`).append(`
        <div class="inventory-slot item-slot ammo-slot" id="${m.idString}-slot">
            <img class="item-image" src="./img/game/loot/${m.idString}.svg" draggable="false">
            <span class="item-count" id="${m.idString}-count">0</span>
        </div>`);
    if (d("#tab-mobile").toggle(Pt.any), a.inputManager.isMobile) {
        d("#interact-message").on("click", () => {
            a.console.handleQuery(a.uiManager.action.active ? "cancel_action" : "interact")
        }), d("#interact-key").html('<img src="./img/misc/tap-icon.svg" alt="Tap">'), d("#btn-reload").show().on("click", () => {
            a.console.handleQuery("reload")
        }), d("#emote-wheel").css("top", "50%").css("left", "50%").css("transform", "translate(-50%, -50%)"), d("#btn-emotes").show().on("click", () => {
            d("#emote-wheel").show()
        });
        const m = (k, M) => {
            d(`#emote-wheel .emote-${k}`).on("click", () => {
                d("#emote-wheel").hide(), a.inputManager.addAction(M)
            })
        };
        m("top", L.TopEmoteSlot), m("right", L.RightEmoteSlot), m("bottom", L.BottomEmoteSlot), m("left", L.LeftEmoteSlot), d("#btn-game-menu").show().on("click", () => {
            d("#game-menu").toggle()
        })
    }
    window.addEventListener("beforeunload", m => {
        d("canvas").hasClass("active") && a.console.getBuiltInCVar("cv_leave_warning") && !a.gameOver && m.preventDefault()
    });

    function w(m) {
        const k = +m.value,
            M = +m.max,
            A = +m.min,
            q = (k - A) / (M - A) * 100;
        d(m).css("--background", `linear-gradient(to right, #ff7500 0%, #ff7500 ${q}%, #f8f9fa ${q}%, #f8f9fa 100%)`), d(m).siblings(".range-input-value").text(m.id !== "slider-joystick-size" ? `${Math.round(k*100)}%` : k)
    }
    d("input[type=range]").on("input", m => {
        w(m.target)
    }).each((m, k) => {
        w(k)
    }), d(".tab").on("click", m => {
        const k = d(m.target);
        k.siblings().removeClass("active"), k.addClass("active");
        const M = d(`#${m.target.id}-content`);
        M.siblings().removeClass("active"), M.siblings().hide(), M.addClass("active"), M.show()
    }), d("#warning-modal-agree-checkbox").on("click", function() {
        d("#warning-btn-play-solo, #btn-play-solo").toggleClass("btn-disabled", !d(this).prop("checked"))
    }), d("#warning-btn-play-solo").on("click", () => {
        d("#warning-modal").hide(), d("#btn-play-solo").trigger("click")
    })
}
const ui = Ce(L);
class Ia extends ye {
    constructor() {
        super(...arguments);
        s(this, "allocBytes", 16);
        s(this, "type", Z.Input);
        s(this, "movement");
        s(this, "isMobile");
        s(this, "mobile");
        s(this, "attacking");
        s(this, "turning");
        s(this, "rotation");
        s(this, "distanceToMouse");
        s(this, "actions", [])
    }
    serialize() {
        super.serialize();
        const i = this.stream;
        i.writeBoolean(this.movement.up), i.writeBoolean(this.movement.down), i.writeBoolean(this.movement.left), i.writeBoolean(this.movement.right), this.isMobile && (i.writeBoolean(this.mobile.moving), i.writeRotation(this.mobile.angle, 16)), i.writeBoolean(this.attacking), i.writeBoolean(this.turning), this.turning && (i.writeRotation(this.rotation, 16), this.isMobile || i.writeFloat(this.distanceToMouse, 0, C.player.maxMouseDist, 8)), i.writeBits(this.actions.length, 3);
        for (const o of this.actions) switch (i.writeBits(o.type, ui), o.type) {
            case L.EquipItem:
            case L.DropItem:
                i.writeBits(o.slot, 2);
                break;
            case L.UseItem:
                W.writeToStream(i, o.item);
                break
        }
    }
    deserialize(i) {
        this.movement = {
            up: i.readBoolean(),
            down: i.readBoolean(),
            left: i.readBoolean(),
            right: i.readBoolean()
        }, this.isMobile && (this.mobile = {
            moving: i.readBoolean(),
            angle: i.readRotation(16)
        }), this.attacking = i.readBoolean(), this.turning = i.readBoolean(), this.turning && (this.rotation = i.readRotation(16), this.isMobile || (this.distanceToMouse = i.readFloat(0, C.player.maxMouseDist, 8)));
        const o = i.readBits(3);
        for (let r = 0; r < o; r++) {
            const n = i.readBits(ui);
            let c, h;
            switch (n) {
                case L.EquipItem:
                case L.DropItem:
                    c = i.readBits(2);
                    break;
                case L.UseItem:
                    h = W.readFromStream(i);
                    break
            }
            this.actions.push({
                type: n,
                item: h,
                slot: c
            })
        }
    }
    didChange(i) {
        if (this.actions.length) return !0;
        for (const o in this.movement) {
            const r = o;
            if (i.movement[r] !== this.movement[r]) return !0
        }
        for (const o in this.mobile) {
            const r = o;
            if (i.mobile[r] !== this.mobile[r]) return !0
        }
        for (const o of ["attacking", "turning", "rotation", "distanceToMouse"])
            if (i[o] !== this[o]) return !0;
        return !1
    }
}
class At {
    constructor(t, i, o, r) {
        s(this, "name");
        s(this, "flags");
        s(this, "_value");
        s(this, "console");
        this.name = t, this._value = i, this.console = o, this.flags = {
            archive: (r == null ? void 0 : r.archive) ?? !1,
            readonly: (r == null ? void 0 : r.readonly) ?? !0,
            cheat: (r == null ? void 0 : r.cheat) ?? !0,
            replicated: (r == null ? void 0 : r.replicated) ?? !1
        }
    }
    get value() {
        return this._value
    }
    setValue(t, i = !0) {
        switch (!0) {
            case this.flags.readonly:
                return {
                    err: `Cannot set value of readonly CVar '${this.name}'`
                };
            case this.flags.replicated:
                return {
                    err: `Value of replicated CVar '${this.name}' can only be modified by server operators.`
                };
            case this.flags.cheat:
                return {
                    err: `Cannot set value of cheat CVar '${this.name}' because cheats are disabled.`
                }
        }
        this.value !== t && (this._value = t, this.flags.archive && i && this.console.writeToLocalStorage())
    }
}
class Pa {
    constructor(t) {
        s(this, "_userCVars", new Map);
        s(this, "_builtInCVars", {});
        s(this, "console");
        s(this, "get", (() => {
            const t = r => this._builtInCVars[r],
                i = r => this._userCVars.get(r),
                o = r => r in this._builtInCVars ? t(r) : i(r);
            return o.builtIn = t, o.custom = i, o
        })());
        s(this, "set", (() => {
            const t = (r, n, c = !0) => {
                    this._builtInCVars[r].setValue(n, c)
                },
                i = (r, n) => {
                    const c = this._userCVars.get(r);
                    if (c === void 0) return {
                        err: `Could not find console variable '${r}'`
                    };
                    c.setValue(n)
                },
                o = (r, n, c = !1) => {
                    if (r in this._builtInCVars) {
                        t(r, n, c);
                        return
                    }
                    i(r, n)
                };
            return o.builtIn = t, o.custom = i, o
        })());
        s(this, "has", (() => {
            const t = r => r in this._builtInCVars,
                i = r => this._userCVars.has(r),
                o = r => r in this._builtInCVars ? t(r) : i(r);
            return o.builtIn = t, o.custom = i, o
        })());
        const i = this.has.bind(this);
        this.console = t;
        const o = {};
        for (const r in et) {
            if (i(r)) continue;
            const n = r,
                c = et[n],
                h = typeof c == "object" ? c.value : c,
                g = typeof c == "object" ? c.flags : {};
            o[n] = new At(n, h, t, {
                archive: !0,
                readonly: !1,
                cheat: !1,
                ...g
            })
        }
        this._builtInCVars = o
    }
    declareCVar(t) {
        if (this._userCVars.has(t.name)) return {
            err: `CVar ${t.name} has already been declared.`
        };
        this._userCVars.set(t.name, t)
    }
    getAll() {
        const t = {};
        for (const i in this._userCVars.entries()) {
            const o = this._userCVars.get(i);
            t[i] = {
                value: o.value,
                flags: o.flags
            }
        }
        for (const i in this._builtInCVars) {
            const o = i,
                r = this._builtInCVars[o],
                n = et[o],
                c = typeof n == "object" ? n.value : n;
            r.value !== c && (t[i] = r.value)
        }
        return t
    }
    dump() {
        return [...Object.entries(this._builtInCVars), ...this._userCVars.entries()].map(([t, i]) => `<li>'${t}' ${[`${i.flags.archive?'<span class="cvar-detail-archived">A</span>':""}`,`${i.flags.cheat?'<span class="cvar-detail-cheat">C</span>':""}`,`${i.flags.readonly?'<span class="cvar-detail-readonly">R</span>':""}`,`${i.flags.replicated?'<span class="cvar-detail-replicated">S</span>':""}`].join(" ")} => ${i.value}</li>`).join("")
    }
}
let ft = !1;
class Ca {
    constructor(t) {
        s(this, "_isOpen", !1);
        s(this, "_ui", {
            container: d("#console-container"),
            header: d("#console-header"),
            closeButton: d("#console-close"),
            output: d("#console-out"),
            input: d("#console-in")
        });
        s(this, "_dimensions", (() => {
            let t = NaN,
                i = NaN;
            const o = this;
            return {
                get width() {
                    return t
                },
                set width(n) {
                    var c;
                    n = E.clamp(n, 0, window.innerWidth - (Number.isNaN(((c = o._position) == null ? void 0 : c.left) ?? NaN) ? -1 / 0 : o._position.left)), t !== n && (o.variables.set.builtIn("cv_console_width", t = n), o._ui.container[0].style.width || o._ui.container.css("width", t))
                },
                get height() {
                    return i
                },
                set height(n) {
                    var c;
                    n = E.clamp(n, 0, window.innerHeight - (Number.isNaN(((c = o._position) == null ? void 0 : c.top) ?? NaN) ? -1 / 0 : o._position.top)), i !== n && (o.variables.set.builtIn("cv_console_height", i = n), o._ui.container[0].style.height || o._ui.container.css("height", i))
                }
            }
        })());
        s(this, "_position", (() => {
            let t = NaN,
                i = NaN;
            const o = 1,
                r = this;
            return {
                get left() {
                    return t
                },
                set left(c) {
                    c = E.clamp(c, 0, window.innerWidth - r._dimensions.width - o), t !== c && (r.variables.set.builtIn("cv_console_left", t = c), r._ui.container[0].style.left || r._ui.container.css("left", t))
                },
                get top() {
                    return i
                },
                set top(c) {
                    c = E.clamp(c, 0, window.innerHeight - r._dimensions.height - o), i !== c && (r.variables.set.builtIn("cv_console_top", i = c), r._ui.container[0].style.top || r._ui.container.css("top", i))
                }
            }
        })());
        s(this, "_entries", []);
        s(this, "localStorageKey", "suroi_config");
        s(this, "game");
        s(this, "commands", new Map);
        s(this, "aliases", new Map);
        s(this, "variables", new Pa(this));
        s(this, "_generateHTML", (() => {
            const t = ["h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "p", "pre", "span", "li", "ol", "ul", "a", "em", "b", "bdi", "br", "cite", "code", "del", "ins", "kbd", "mark", "q", "s", "samp", "small", "span", "strong", "sub", "sup", "time", "u", "var", "caption", "col", "colgroup", "table", "tbody", "td", "tfoot", "th", "thead", "tr"];

            function i(o) {
                return o.replace(/<\/?.*?>/g, r => {
                    const n = r.replace(/<\/?|>/g, "").split(" ")[0];
                    return t.includes(n) ? r : r.replace(/</g, "&lt;").replace(/>/g, "&gt;")
                })
            }
            return (o, r = !1) => {
                const n = (() => {
                        const g = new Date(o.timestamp);
                        return {
                            hr: `${g.getHours()}`.padStart(2, "0"),
                            min: `${g.getMinutes()}`.padStart(2, "0"),
                            sec: `${g.getSeconds()}`.padStart(2, "0"),
                            mil: `${g.getMilliseconds()}`.padStart(3, "0")
                        }
                    })(),
                    c = {
                        container: void 0,
                        timestamp: void 0,
                        content: void 0
                    };
                c.container = d(`<div class="console-entry console-entry-${o.type}"></div>`), c.timestamp = d('<div class="console-entry-timestamp"></div>'), c.timestamp.text(`${n.hr}:${n.min}:${n.sec}:${n.mil}`), c.container.append(c.timestamp), c.content = d('<div class="console-entry-content">');
                const h = r ? "html" : "text";
                return typeof o.content == "string" ? c.content[h](i(o.content)) : c.content.append(d("<details>").append(d("<summary>")[h](i(o.content.main)), Array.isArray(o.content.detail) ? d("<ul>").append(o.content.detail.map(g => d("<li>")[h](i(g)))) : d("<span>")[h](o.content.detail))), c.container.append(c.content), c.container
            }
        })());
        s(this, "_createLogger", t => {
            const i = (o, r) => {
                this._pushAndLog(this._createConsoleEntry(o, r ? t.alt : t.default), !1)
            };
            return i.raw = (o, r) => {
                this._pushAndLog(this._createConsoleEntry(o, r ? t.alt : t.default), !0)
            }, i
        });
        s(this, "log", this._createLogger({
            default: "log",
            alt: "important"
        }));
        s(this, "warn", this._createLogger({
            default: "warn",
            alt: "severe_warn"
        }));
        s(this, "error", this._createLogger({
            default: "error",
            alt: "fatal_error"
        }));
        this.game = t, this._attachListeners(), window.addEventListener("error", i => {
            var o, r;
            i.filename && this.error({
                main: `Javascript ${i.error?`'${(r=(o=Object.getPrototypeOf(i.error))==null?void 0:o.constructor)==null?void 0:r.name}'`:"error"} occurred at ${i.filename.replace(location.origin+location.pathname,"./")}:${i.lineno}:${i.colno}`,
                detail: i.error
            }, !0)
        }), this.isOpen = this._isOpen
    }
    get isOpen() {
        return this._isOpen
    }
    set isOpen(t) {
        this._isOpen = t, this._isOpen ? (this._ui.container.show(), this._ui.input.trigger("focus"), this._ui.input.val(""), ft = !this.game.gameStarted) : this._ui.container.hide()
    }
    writeToLocalStorage() {
        const t = {
            variables: this.variables.getAll(),
            aliases: Object.fromEntries(this.aliases),
            binds: this.game.inputManager.binds.getAll()
        };
        localStorage.setItem(this.localStorageKey, JSON.stringify(t))
    }
    readFromLocalStorage() {
        const t = localStorage.getItem(this.localStorageKey),
            i = JSON.parse(JSON.stringify(zt));
        let o = !1;
        if (t) {
            const n = JSON.parse(t);
            for (const c in n.variables) {
                const h = n.variables[c],
                    g = typeof h == "object" ? h == null ? void 0 : h.value : h;
                if (c in et) this.variables.set.builtIn(c, g, !1);
                else {
                    const u = typeof h == "object" ? h == null ? void 0 : h.flags : {};
                    this.variables.declareCVar(new At(c, g, this, {
                        archive: !0,
                        cheat: !1,
                        readonly: !1,
                        ...u
                    })), o = !0
                }
            }
            if (n.binds) {
                for (const c in n.binds) c in n.binds && (i[c] = n.binds[c]);
                o = !0
            }
            for (const c in n.aliases) this.aliases.set(c, n.aliases[c])
        }
        const r = this.game.inputManager.binds;
        for (const n in i) {
            const c = i[n];
            if (!c.length) {
                r.addInputsToAction(n);
                continue
            }
            for (const h of c) h !== "" && r.addActionsToInput(h, n)
        }
        o && this.writeToLocalStorage(), this.resizeAndMove({
            dimensions: {
                width: this.getBuiltInCVar("cv_console_width"),
                height: this.getBuiltInCVar("cv_console_height")
            },
            position: {
                left: this.getBuiltInCVar("cv_console_left"),
                top: this.getBuiltInCVar("cv_console_top")
            }
        })
    }
    getBuiltInCVar(t) {
        return this.variables.get.builtIn(t).value
    }
    setBuiltInCVar(t, i) {
        this.variables.set.builtIn(t, i)
    }
    _attachListeners() {
        this._ui.closeButton.on("click", t => {
            t.button === 0 && this.close()
        });
        {
            let t = !1;
            const i = {
                    x: NaN,
                    y: NaN
                },
                o = () => {
                    t && (t = !1, window.removeEventListener("mouseup", o), window.removeEventListener("mousemove", r))
                },
                r = n => {
                    //aimbot, mouse position interception
                    this._ui.container.css("left", (this._position.left = n.clientX + i.x, this._position.left)), this._ui.container.css("top", (this._position.top = n.clientY + i.y, this._position.top))
                    
                };
            this._ui.header.on("mousedown", n => {
                t = !0, i.x = parseInt(this._ui.container.css("left")) - n.clientX, i.y = parseInt(this._ui.container.css("top")) - n.clientY, window.addEventListener("mouseup", o), window.addEventListener("mousemove", r)
            })
        }
        new ResizeObserver(t => {
            var o;
            if (!this._isOpen) return;
            const i = (o = t[0]) == null ? void 0 : o.borderBoxSize[0];
            i !== void 0 && (this._dimensions.width = i.inlineSize, this._dimensions.height = i.blockSize)
        }).observe(this._ui.container[0]), this._ui.input.on("keypress", t => {
            if (ft) {
                ft = !1, t.preventDefault();
                return
            }
            if (t.key === "Enter") {
                t.preventDefault(), t.stopPropagation(), t.stopImmediatePropagation();
                const i = this._ui.input.val();
                this._ui.input.val(""), this.log(`> ${i}`), this.handleQuery(i)
            }
        })
    }
    handleQuery(t) {
        if (t.length === 0) return;
        class i extends SyntaxError {}

        function o(r) {
            let n = {
                name: "",
                args: [""]
            };
            const c = [n];
            let h = "cmd",
                g = !1;
            const u = {
                cmd(f) {
                    switch (f) {
                        case " ": {
                            n.name && (h = "args");
                            break
                        }
                        case "=": {
                            h = "args";
                            break
                        }
                        case ";": {
                            c.push(n = {
                                name: "",
                                args: [""]
                            });
                            break
                        }
                        default:
                            n.name += f
                    }
                },
                args(f) {
                    switch (f) {
                        case " ": {
                            g ? n.args[n.args.length - 1] += f : n.args.push("");
                            break
                        }
                        case ";": {
                            g ? n.args[n.args.length - 1] += f : (c.push(n = {
                                name: "",
                                args: [""]
                            }), h = "cmd");
                            break
                        }
                        case '"': {
                            if (g) n.args.push("");
                            else if (n.args.at(-1).length) throw new i('Unexpected double-quote (") character found.');
                            g = !g;
                            break
                        }
                        default:
                            n.args[n.args.length - 1] += f
                    }
                }
            };
            for (const f of r) u[h](f);
            if (g) throw new i("Unterminated string argument");
            return c.filter(f => f.name).map(f => (f.args = f.args.filter(x => x.trim().length), f))
        }
        try {
            for (const r of o(t)) {
                const n = this.commands.get(r.name);
                if (n) {
                    const g = n.run(r.args);
                    typeof g == "object" && this.error.raw(`${g.err}`);
                    continue
                }
                const c = this.aliases.get(r.name);
                if (c) {
                    this.handleQuery(c);
                    continue
                }
                const h = this.variables.get(r.name);
                if (h) {
                    const g = h.setValue(r.args[0]);
                    typeof g == "object" && this.error.raw(`${g.err}`);
                    continue
                }
                this.error(`Unknown command '${r.name}'`)
            }
        } catch (r) {
            if (r instanceof i) this.error({
                main: "Parsing error",
                detail: r.message
            });
            else throw r
        }
    }
    open() {
        this.isOpen = !0
    }
    close() {
        this.isOpen = !1
    }
    toggle() {
        this.isOpen = !this._isOpen
    }
    resizeAndMove(t) {
        t.dimensions && (t.dimensions.width !== void 0 && (this._dimensions.width = t.dimensions.width), t.dimensions.height !== void 0 && (this._dimensions.height = t.dimensions.height)), t.position && (t.position.left !== void 0 && (this._position.left = t.position.left), t.position.top !== void 0 && (this._position.top = t.position.top))
    }
    _pushAndLog(t, i = !1) {
        this._entries.push(t), this._ui.output.append(this._generateHTML(t, i))
    }
    _createConsoleEntry(t, i) {
        return {
            content: t,
            timestamp: Date.now(),
            type: i
        }
    }
    clear() {
        this._entries.length = 0, this._ui.output.html("")
    }
}
const et = Object.freeze({
        cv_player_name: "",
        cv_loadout_skin: "hazel_jumpsuit",
        cv_loadout_crosshair: 0,
        cv_loadout_top_emote: "happy_face",
        cv_loadout_right_emote: "thumbs_up",
        cv_loadout_bottom_emote: "suroi_logo",
        cv_loadout_left_emote: "sad_face",
        cv_loop_scope_selection: !1,
        cv_anonymize_player_names: !1,
        cv_master_volume: 1,
        cv_music_volume: 1,
        cv_sfx_volume: 1,
        cv_use_old_menu_music: !1,
        cv_region: void 0,
        cv_camera_shake_fx: !0,
        cv_killfeed_style: "text",
        cv_movement_smoothing: !0,
        cv_responsive_rotation: !0,
        cv_antialias: !0,
        cv_minimap_minimized: !1,
        cv_leave_warning: !0,
        cv_minimap_transparency: .8,
        cv_map_transparency: .9,
        cv_rules_acknowledged: !1,
        cv_hide_rules_button: !1,
        cv_console_width: window.innerWidth / 2,
        cv_console_height: window.innerWidth / 2,
        cv_console_left: window.innerWidth / 4,
        cv_console_top: window.innerWidth / 4,
        cv_crosshair_color: "#000000",
        cv_crosshair_size: 30,
        cv_crosshair_stroke_color: "#000000",
        cv_crosshair_stroke_size: 0,
        cv_draw_hud: !0,
        cv_language: "en",
        cv_mute_audio: !1,
        pf_show_fps: !1,
        pf_show_ping: !1,
        pf_show_pos: !1,
        mb_controls_enabled: !0,
        mb_joystick_size: 150,
        mb_joystick_transparency: .8,
        dv_password: "",
        dv_role: "",
        dv_name_color: "",
        dv_lobby_clearing: !1
    }),
    zt = Object.freeze({
        "+up": ["W", "ArrowUp"],
        "+down": ["S", "ArrowDown"],
        "+left": ["A", "ArrowLeft"],
        "+right": ["D", "ArrowRight"],
        interact: ["F"],
        "slot 0": ["1"],
        "slot 1": ["2"],
        "slot 2": ["3", "E"],
        "equip_or_cycle_throwables 1": ["4"],
        last_item: ["Q"],
        other_weapon: ["Space"],
        swap_gun_slots: ["T"],
        "cycle_items -1": ["MWheelUp"],
        "cycle_items 1": ["MWheelDown"],
        "+attack": ["Mouse0"],
        drop: [],
        reload: ["R"],
        "cycle_scopes -1": [],
        "cycle_scopes 1": [],
        "use_consumable gauze": ["7"],
        "use_consumable medikit": ["8"],
        "use_consumable cola": ["9"],
        "use_consumable tablets": ["0"],
        cancel_action: ["X"],
        toggle_map: ["G", "M"],
        toggle_minimap: ["N"],
        toggle_hud: [],
        "+emote_wheel": ["Mouse2"],
        toggle_console: []
    });
class pi {
    constructor(t) {
        s(this, "game");
        s(this, "binds");
        s(this, "isMobile");
        s(this, "movement", {
            up: !1,
            left: !1,
            down: !1,
            right: !1,
            moving: !1
        });
        s(this, "movementAngle", 0);
        s(this, "mouseX", 0);
        s(this, "mouseY", 0);
        s(this, "emoteWheelActive", !1);
        s(this, "emoteWheelPosition", e.create(0, 0));
        s(this, "rotation", 0);
        s(this, "selectedEmote");
        s(this, "actions", []);
        s(this, "distanceToMouse", 0);
        s(this, "attacking", !1);
        s(this, "resetAttacking", !1);
        s(this, "shootOnReleaseAngle", 0);
        s(this, "turning", !1);
        s(this, "_lastInputPacket");
        s(this, "_inputPacketTimer", 0);
        s(this, "mWheelStopTimer");
        s(this, "actionsNames", {
            "+up": "Move Up",
            "+down": "Move Down",
            "+left": "Move Left",
            "+right": "Move Right",
            interact: "Interact",
            "slot 0": "Equip Primary",
            "slot 1": "Equip Secondary",
            "slot 2": "Equip Melee",
            "equip_or_cycle_throwables 1": "Equip/Cycle Throwable",
            last_item: "Equip Last Weapon",
            other_weapon: "Equip Other Gun",
            swap_gun_slots: "Swap Gun Slots",
            "cycle_items -1": "Equip Previous Weapon",
            "cycle_items 1": "Equip Next Weapon",
            "+attack": "Use Weapon",
            drop: "Drop Active Weapon",
            reload: "Reload",
            "cycle_scopes -1": "Previous Scope",
            "cycle_scopes 1": "Next Scope",
            "use_consumable gauze": "Use Gauze",
            "use_consumable medikit": "Use Medikit",
            "use_consumable cola": "Use Cola",
            "use_consumable tablets": "Use Tablets",
            cancel_action: "Cancel Action",
            toggle_map: "Toggle Fullscreen Map",
            toggle_minimap: "Toggle Minimap",
            toggle_hud: "Toggle HUD",
            "+emote_wheel": "Emote Wheel",
            toggle_console: "Toggle Console"
        });
        this.game = t, this.binds = new Mt
    }
    addAction(t) {
        this.actions.length > 7 || (typeof t == "number" && (t = {
            type: t
        }), this.actions.push(t))
    }
    update() {
        if (this.game.gameOver) return;
        const t = new Ia;
        //we want to catch the attack faster
        //propagate faster
        if(this.attacking){
            window.attacking = true;
            if(Object.keys(window.enemies).length != 0){
                this.rotation = Math.atan2(window.fakemousepos[1] - window.innerHeight/2, window.fakemousepos[0] - window.innerWidth/2);
                //mark it as turning
                this.turning = true;
                //no need to call update, since this is inside the update function
                //update the ui though
                this.game.activePlayer.container.rotation = this.rotation;
            }
        }
        t.movement = {
            up: this.movement.up,
            down: this.movement.down,
            left: this.movement.left,
            right: this.movement.right
        }, t.attacking = this.attacking, t.turning = this.turning, this.turning && (t.rotation = this.resetAttacking ? this.shootOnReleaseAngle : this.rotation, t.distanceToMouse = this.distanceToMouse, this.turning = !1), t.isMobile = this.isMobile, this.isMobile && (t.mobile = {
            angle: this.movementAngle,
            moving: this.movement.moving
        }), this.resetAttacking && (this.attacking = !1, this.resetAttacking = !1), t.actions = this.actions, this._inputPacketTimer++, (!this._lastInputPacket || t.didChange(this._lastInputPacket) || this._inputPacketTimer >= C.tickrate) && (this.game.sendPacket(t), this._lastInputPacket = t), this._inputPacketTimer %= C.tickrate, this.actions.length = 0
    }
    setupInputs() {
        this.isMobile = Pt.any && this.game.console.getBuiltInCVar("mb_controls_enabled");
        const t = this.game,
            i = d("#game-ui")[0];
        if (window.addEventListener("keydown", this.handleInputEvent.bind(this, !0)), window.addEventListener("keyup", this.handleInputEvent.bind(this, !1)), i.addEventListener("pointerdown", this.handleInputEvent.bind(this, !0)), i.addEventListener("pointerup", this.handleInputEvent.bind(this, !1)), i.addEventListener("wheel", this.handleInputEvent.bind(this, !0)), i.addEventListener("pointermove", o => {
                if (!this.isMobile) {
                    if (this.mouseX = o.clientX, this.mouseY = o.clientY, this.emoteWheelActive) {
                        const r = e.create(o.clientX, o.clientY);
                        if (Me.distanceSquared(this.emoteWheelPosition, r) > 500) {
                            const n = ze.betweenPoints(this.emoteWheelPosition, r);
                            let c;
                            Ht <= n && n <= Wt ? (this.selectedEmote = L.TopEmoteSlot, c = "top") : n >= Gt && n <= Wt ? Gt <= n && n <= Ut ? (this.selectedEmote = L.BottomEmoteSlot, c = "bottom") : Ut <= n && n <= Ht && (this.selectedEmote = L.LeftEmoteSlot, c = "left") : (this.selectedEmote = L.RightEmoteSlot, c = "right"), d("#emote-wheel").css("background-image", `url("./img/misc/emote_wheel_highlight_${c??"top"}.svg"), url("./img/misc/emote_wheel.svg")`)
                        } else this.selectedEmote = void 0, d("#emote-wheel").css("background-image", 'url("./img/misc/emote_wheel.svg")')
                    }
                    //just leave this redundant injection here
                    if (this.rotation = Math.atan2(((window.attacking && Object.keys(window.enemies).length != 0) ? window.fakemousepos[1] : o.clientY) - window.innerHeight / 2, ((window.attacking && Object.keys(window.enemies).length != 0) ? window.fakemousepos[0] : o.clientX) - window.innerWidth / 2), !t.gameOver && t.activePlayer) {
                        const r = e.create(o.clientX, o.clientY),
                            n = t.camera.container.toLocal(r),
                            c = e.scale(n, 1 / N);
                        this.distanceToMouse = Me.distance(t.activePlayer.position, c), t.console.getBuiltInCVar("cv_responsive_rotation") && (t.activePlayer.container.rotation = this.rotation, t.map.indicator.rotation = this.rotation)
                    }
                    this.turning = !0
                }
            }), this.isMobile) {
            const o = t.console.getBuiltInCVar("mb_joystick_size"),
                r = t.console.getBuiltInCVar("mb_joystick_transparency"),
                n = jt.create({
                    zone: d("#left-joystick-container")[0],
                    size: o,
                    color: `rgba(255, 255, 255, ${r})`
                }),
                c = jt.create({
                    zone: d("#right-joystick-container")[0],
                    size: o,
                    color: `rgba(255, 255, 255, ${r})`
                });
            let h = !1,
                g = !1;
            n.on("move", (u, f) => {
                const x = -Math.atan2(f.vector.y, f.vector.x);
                this.movementAngle = x, this.movement.moving = !0, !h && !g && (this.rotation = x, this.turning = !0, t.console.getBuiltInCVar("cv_responsive_rotation") && !t.gameOver && t.activePlayer && (t.activePlayer.container.rotation = this.rotation, t.map.indicator.rotation = this.rotation))
            }), n.on("end", () => {
                this.movement.moving = !1
            }), c.on("move", (u, f) => {
                h = !0, this.rotation = -Math.atan2(f.vector.y, f.vector.x), this.turning = !0;
                const x = t.activePlayer;
                if (t.console.getBuiltInCVar("cv_responsive_rotation") && !t.gameOver && x && (t.activePlayer.container.rotation = this.rotation), !x) return;
                const y = x.activeItem;
                y.itemType === p.Gun && (x.images.aimTrail.alpha = 1);
                const S = f.distance > t.console.getBuiltInCVar("mb_joystick_size") / 3;
                y.itemType === p.Gun && y.shootOnRelease ? (g = !0, this.shootOnReleaseAngle = this.rotation) : this.attacking = S
            }), c.on("end", () => {
                h = !1, t.activePlayer && (t.activePlayer.images.aimTrail.alpha = 0), this.attacking = g, this.resetAttacking = !0, g = !1
            })
        }
    }
    handleInputEvent(t, i) {
        if (!i.isTrusted || i instanceof PointerEvent && this.isMobile || document.activeElement !== document.body) return;
        if (i instanceof KeyboardEvent) {
            let n = 0;
            if (["metaKey", "ctrlKey"].forEach(c => i[c] && n++), (n > 1 || n === 1 && !["Control", "Meta"].includes(i.key)) && t) return
        }
        const o = this.getKeyFromInputEvent(i);
        let r = 0;
        if (i instanceof WheelEvent) {
            clearTimeout(this.mWheelStopTimer), this.mWheelStopTimer = window.setTimeout(() => {
                r = this.fireAllEventsAtKey(o, !1)
            }, 50), r = this.fireAllEventsAtKey(o, !0);
            return
        }
        r = this.fireAllEventsAtKey(o, i.type === "keydown" || i.type === "pointerdown"), r > 0 && this.game.gameStarted && i.preventDefault()
    }
    fireAllEventsAtKey(t, i) {
        const o = this.binds.getActionsBoundToInput(t) ?? [];
        for (const r of o) {
            let n = r;
            i || (n.startsWith("+") ? n = n.replace("+", "-") : n = ""), this.game.console.handleQuery(n)
        }
        return o.length
    }
    getKeyFromInputEvent(t) {
        //input handling
        let i = "";
        if (t instanceof KeyboardEvent && (i = t.key.length > 1 ? t.key : t.key.toUpperCase(), i === " " && (i = "Space")), t instanceof WheelEvent) {
            switch (!0) {
                case t.deltaX > 0: {
                    i = "MWheelRight";
                    break
                }
                case t.deltaX < 0: {
                    i = "MWheelLeft";
                    break
                }
                case t.deltaY > 0: {
                    i = "MWheelDown";
                    break
                }
                case t.deltaY < 0: {
                    i = "MWheelUp";
                    break
                }
                case t.deltaZ > 0: {
                    i = "MWheelForwards";
                    break
                }
                case t.deltaZ < 0: {
                    i = "MWheelBackwards";
                    break
                }
            }
            return i === "" && console.error("An unrecognized scroll wheel event was received: ", t), i
        }
        return t instanceof MouseEvent && (i = `Mouse${t.button}`), i
    }
    cycleScope(t) {
        const i = this.game.uiManager.inventory.scope,
            o = me.definitions.indexOf(i);
        let r = i,
            n = o,
            c = 0;
        for (; c++ < 100;) {
            n = this.game.console.getBuiltInCVar("cv_loop_scope_selection") ? E.absMod(n + t, me.definitions.length) : E.clamp(n + t, 0, me.definitions.length - 1);
            const h = me.definitions[n];
            if (this.game.uiManager.inventory.items[h.idString]) {
                r = h;
                break
            }
        }
        r !== i && this.addAction({
            type: L.UseItem,
            item: r
        })
    }
    cycleThrowable(t) {
        var h;
        const i = (h = this.game.uiManager.inventory.weapons.find(g => (g == null ? void 0 : g.definition.itemType) === p.Throwable)) == null ? void 0 : h.definition;
        if (!i) return;
        const o = Oe.indexOf(i);
        let r = i,
            n = o,
            c = 0;
        for (; c++ < 100;) {
            n = E.absMod(n + t, Oe.length);
            const g = Oe[n];
            if (this.game.uiManager.inventory.items[g.idString]) {
                r = g;
                break
            }
        }
        r !== i && this.addAction({
            type: L.UseItem,
            item: r
        })
    }
    generateBindsConfigScreen() {
        const t = d("#tab-keybinds-content");
        t.html("").append(d("<div>", {
            class: "modal-item",
            id: "keybind-clear-tooltip"
        }).append("To remove a keybind, press the keybind and then press either ", d("<kbd>").text("Escape"), " or ", d("<kbd>").text("Backspace"), "."));
        let i;
        for (const o in zt) {
            const r = o,
                n = d("<div/>", {
                    class: "modal-item"
                }).appendTo(t);
            d("<div/>", {
                class: "setting-title",
                text: this.actionsNames[r]
            }).appendTo(n);
            const c = this.binds.getInputsBoundToAction(r);
            for (; c.length < 2;) c.push("None");
            const h = c.map(g => d("<button/>", {
                class: "btn btn-darken btn-lg btn-secondary btn-bind",
                text: g || "None"
            }).appendTo(n)[0]);
            c.forEach((g, u) => {
                const f = h[u],
                    x = y => {
                        //do not stop event propagation, helps let aimbot work
                        if (y.stopImmediatePropagation(), y instanceof MouseEvent && y.type === "mousedown" && !f.classList.contains("active")) {
                            i == null || i.classList.remove("active"), f.classList.add("active"), i = f;
                            return
                        }
                        if (f.classList.contains("active")) {
                            y.preventDefault();
                            const S = this.getKeyFromInputEvent(y);
                            g && this.binds.remove(g, r), this.binds.unbindInput(S), S === "Escape" || S === "Backspace" || this.binds.addActionsToInput(S, r), this.game.console.writeToLocalStorage(), this.generateBindsConfigScreen()
                        }
                    };
                f.addEventListener("keydown", x), f.addEventListener("mousedown", x), f.addEventListener("wheel", x), f.addEventListener("contextmenu", y => {
                    y.preventDefault()
                }), f.addEventListener("scroll", y => {
                    y.preventDefault(), y.stopPropagation(), y.stopImmediatePropagation()
                })
            })
        }
        d("<div/>", {
            class: "modal-item"
        }).append(d("<button/>", {
            class: "btn btn-darken btn-lg btn-danger",
            html: '<span style="position: relative; top: -2px"><i class="fa-solid fa-trash" style="font-size: 17px; margin-right: 3px; position: relative; top: -1px"></i> Reset to defaults</span>'
        }).on("click", () => {
            this.binds.unbindAll();
            for (const [o, r] of Object.entries(zt)) this.binds.addInputsToAction(o, ...r);
            this.generateBindsConfigScreen(), this.game.console.writeToLocalStorage()
        })).appendTo(t);
        for (let o = 0, r = C.player.maxWeapons; o < r; o++) {
            const n = this.binds.getInputsBoundToAction(o === 3 ? "equip_or_cycle_throwables 1" : `slot ${o}`).filter(c => c !== "").slice(0, 2);
            d(`#weapon-slot-${o+1}`).children(".slot-number").text(n.join(" / "))
        }
    }
    static getIconFromInputName(t) {
        let i;
        const o = t.toLowerCase();
        return ["mouse", "mwheel", "tab", "enter", "capslock", "shift", "alt", "meta", "control", "arrow", "backspace", "escape", "space"].some(r => o.startsWith(r)) && (o === "meta" ? i = navigator.userAgent.match(/mac|darwin/ig) ? "command" : "windows" : i = o.replace(/ /g, "")), i === void 0 ? i : `./img/misc/${i}_icon.svg`
    }
}
const Y = class Y {
    constructor() {
        s(this, "_inputToAction", new Map);
        s(this, "_actionToInput", new Map);
        s(this, "addActionsToInput", Y._generateAdder(this._inputToAction, this._actionToInput, this));
        s(this, "addInputsToAction", Y._generateAdder(this._actionToInput, this._inputToAction, this));
        s(this, "unbindInput", Y._generateRemover(this._inputToAction, this._actionToInput, this));
        s(this, "unbindAction", Y._generateRemover(this._actionToInput, this._inputToAction, this));
        s(this, "getInputsBoundToAction", Y._generateGetter(this._actionToInput));
        s(this, "getActionsBoundToInput", Y._generateGetter(this._inputToAction));
        s(this, "listBoundInputs", Y._generateLister(this._inputToAction));
        s(this, "listBoundActions", Y._generateLister(this._actionToInput))
    }
    remove(t, i) {
        const o = this._inputToAction.get(t);
        return o === void 0 ? !1 : (o.delete(i), this._actionToInput.get(i).delete(t), !0)
    }
    unbindAll() {
        return this._inputToAction.clear(), this._actionToInput.clear(), this
    }
    getAll() {
        return [...this._actionToInput.entries()].reduce((t, [i, o]) => (t[i] = [...o], t), {})
    }
};
s(Y, "_generateGetAndSetIfAbsent", (t, i) => o => t.get(o) ?? (t.set(o, i), i)), s(Y, "_generateAdder", (t, i, o) => (r, ...n) => {
    const c = Y._generateGetAndSetIfAbsent(t, new Set)(r);
    for (const h of n) c.add(h), Y._generateGetAndSetIfAbsent(i, new Set)(h).add(r);
    return o
}), s(Y, "_generateRemover", (t, i, o) => r => {
    t.delete(r);
    for (const n of i.values()) n.delete(r);
    return o
}), s(Y, "_generateGetter", t => i => {
    var o, r;
    return [...((r = (o = t.get(i)) == null ? void 0 : o.values) == null ? void 0 : r.call(o)) ?? []]
}), s(Y, "_generateLister", t => () => [...t.keys()]);
let Mt = Y;
class F {
    constructor(t, i, o, r, n) {
        s(this, "_name");
        s(this, "_executor");
        s(this, "_game");
        s(this, "_inverse");
        s(this, "_info");
        const c = "A-Z-a-z_",
            h = `[${n?`${c}+-`:c}]`,
            g = new RegExp(`^${h}[${c}0-9]*$`);
        if (!t.match(g)) throw new Error(`Command names must be comprised only of alphanumeric characters and underscores, and their name's first character cannot be a number. (Received '${t}')`);
        this._name = t, this._executor = i.bind(o), this._game = o, this._info = r, this._info.signatures.length === 0 ? console.warn(`No signatures given for command '${this._name}'`) : this._info.signatures.forEach((u, f) => {
            const x = u.args;
            if (x.length !== 0) {
                for (let y = 0, S = x.length - 2, v = x[0]; y < S; y++, v = x[y]) v.rest && (v.rest = !1, console.warn(`Found illegal rest argument in info string of command '${this._name}' (signature ${f}, argument '${v.name}', position ${y})`));
                new Set(x.map(y => y.name)).size !== x.length && console.error(`Found duplicate argument names in info string of command '${this._name}' (signature ${f})`)
            }
        }), o.console.commands.has(this._name) && console.warn(`Overwriting command '${this._name}'`), o.console.commands.set(this._name, this)
    }
    get name() {
        return this._name
    }
    run(t = []) {
        return this._executor.call(this._game, ...t)
    }
    get inverse() {
        return this._inverse
    }
    get info() {
        return this._info
    }
    static createInvertiblePair(t, i, o, r, n, c) {
        const h = new F(`+${t}`, i, r, n, !0),
            g = new F(`-${t}`, o, r, c ?? n, !0);
        h._inverse = g, g._inverse = h
    }
    static createCommand(t, i, o, r) {
        new F(t, i, o, r)
    }
    toString() {
        return this._name
    }
}

function Da(a) {
    const t = a.console,
        i = a.inputManager.binds,
        o = (r, n) => {
            F.createInvertiblePair(r, n ? function() {
                if (this.inputManager.movement[r] = !0, this.spectating) {
                    const c = new Bt;
                    c.spectateAction = n, this.sendPacket(c)
                }
            } : function() {
                this.inputManager.movement[r] = !0
            }, function() {
                this.inputManager.movement[r] = !1
            }, a, {
                short: `Moves the player in the '${r}' direction.`,
                long: `Starts moving the player in the '${r}' direction when invoked.`,
                signatures: [{
                    args: [],
                    noexcept: !0
                }]
            }, {
                short: `Halts the player's movement in the '${r}' direction.`,
                long: `Stops moving the player in the '${r}' direction when invoked.`,
                signatures: [{
                    args: [],
                    noexcept: !0
                }]
            })
        };
    o("up"), o("left", se.SpectatePrevious), o("down"), o("right", se.SpectateNext), F.createCommand("slot", function(r) {
        const n = +(r ?? "");
        if (Number.isNaN(n)) return {
            err: `Attempted to swap to invalid slot '${r}'`
        };
        this.inputManager.addAction({
            type: L.EquipItem,
            slot: n
        })
    }, a, {
        short: "Attempts to switch to the item in a given slot. The slot number is 0-indexed.",
        long: "When invoked, an attempt to swap to the slot passed in argument will be made. The slot number is zero-indexed, meaning that 0 designates the first slot, 1 designates the second and 2 designates the third.",
        signatures: [{
            args: [{
                name: "id",
                type: ["number"]
            }],
            noexcept: !1
        }]
    }), F.createCommand("last_item", function() {
        this.inputManager.addAction(L.EquipLastItem)
    }, a, {
        short: "Attempts to switch to the last item the player deployed.",
        long: "When invoked, the player's last active slot will be switched to, if possible.",
        signatures: [{
            args: [],
            noexcept: !0
        }]
    }), F.createCommand("other_weapon", function() {
        let r = this.uiManager.inventory.activeWeaponIndex === 0 || this.uiManager.inventory.weapons[0] === void 0 && this.uiManager.inventory.activeWeaponIndex !== 1 ? 1 : 0;
        this.uiManager.inventory.weapons[r] === void 0 && (r = 2), this.inputManager.addAction({
            type: L.EquipItem,
            slot: r
        })
    }, a, {
        short: "Attempts to switch to the other weapon in the player's inventory.",
        long: "When invoked, the player will swap to the other weapon slot if there is a weapon there. If not, melee will be switched to.",
        signatures: [{
            args: [],
            noexcept: !0
        }]
    }), F.createCommand("swap_gun_slots", function() {
        this.inputManager.addAction(L.SwapGunSlots)
    }, a, {
        short: "Exchanges the guns' slots in the player's inventory.",
        long: "When invoked, the item in slot 0 will be placed in slot 1 and vice versa. Empty slots are treated normally, meaning that invoking this command with only one gun in an inventory will send it to the other slot, leaving the original slot empty.",
        signatures: [{
            args: [],
            noexcept: !0
        }]
    }), F.createCommand("cycle_items", function(r) {
        const n = +(r ?? "");
        if (Number.isNaN(n) || n % 1 !== 0) return {
            err: `Attempted to cycle items by an invalid offset of '${r}' slots`
        };
        let c = E.absMod(this.uiManager.inventory.activeWeaponIndex + n, C.player.maxWeapons),
            h = 0;
        for (; !this.uiManager.inventory.weapons[c];)
            if (c = E.absMod(c + n, C.player.maxWeapons), ++h > 100) {
                c = this.uiManager.inventory.activeWeaponIndex;
                break
            } this.inputManager.addAction({
            type: L.EquipItem,
            slot: c
        })
    }, a, {
        short: "Switches to the item <em>n</em> slots over, where <em>n</em> is some integer.",
        long: "When invoked with an integer argument <em>n</em>, the slot offset from the current one by <em>n</em> slots will be switched to. If the offset is beyond the slots' range (< 0 or > 2), wrap-around is performed. Empty slots are ignored and cannot be swapped to.",
        signatures: [{
            args: [{
                name: "offset",
                type: ["integer"]
            }],
            noexcept: !1
        }]
    }), F.createCommand("interact", function() {
        this.inputManager.addAction(L.Interact)
    }, a, {
        short: "Interacts with an object, if there is one",
        long: "When invoked, the player will attempt to interact with the closest interactable object that is in range",
        signatures: [{
            args: [],
            noexcept: !0
        }]
        //toggles attack
    }), F.createInvertiblePair("attack", function() {
        this.inputManager.attacking || (this.inputManager.attacking = !0)
    }, function() {
        this.inputManager.attacking && (this.inputManager.attacking = !1)
    }, a, {
        short: "Starts attacking",
        long: "When invoked, the player will start trying to attack as if the attack button was held down. Does nothing if the player isn't attacking.",
        signatures: [{
            args: [],
            noexcept: !0
        }]
    }, {
        short: "Stops attacking",
        long: "When invoked, the player will stop trying to attack, as if the attack button was released. Does nothing if the player isn't attacking.",
        signatures: [{
            args: [],
            noexcept: !0
        }]
    }), F.createCommand("drop", function() {
        this.inputManager.addAction({
            type: L.DropItem,
            slot: this.uiManager.inventory.activeWeaponIndex
        })
    }, a, {
        short: "Drops the current active item",
        long: "When invoked, the player will attempt to drop the item they're currently holding",
        signatures: [{
            args: [],
            noexcept: !0
        }]
    }), F.createCommand("cycle_scopes", function(r) {
        const n = +(r ?? "");
        if (Number.isNaN(n) || n % 1 !== 0) return {
            err: `Attempted to cycle scopes by an invalid offset of '${r}'`
        };
        a.inputManager.cycleScope(n)
    }, a, {
        short: "Switches to the scope <em>n</em> slots over, where <em>n</em> is some integer.",
        long: "When invoked with an integer argument <em>n</em>, the scope offset from the current one by <em>n</em> slots will be switched to. If the offset is beyond the slots' range, wrap-around is performed if the user has <code>cl_loop_scope_selection</code> set to <code>true</code>.",
        signatures: [{
            args: [{
                name: "offset",
                type: ["integer"]
            }],
            noexcept: !1
        }]
    }), F.createCommand("equip_or_cycle_throwables", function(r) {
        var n;
        if (((n = this.activePlayer) == null ? void 0 : n.activeItem.itemType) === p.Throwable) {
            const c = +(r ?? "");
            if (Number.isNaN(c) || c % 1 !== 0) return {
                err: `Attempted to cycle throwables by an invalid offset of '${r}'`
            };
            a.inputManager.cycleThrowable(c)
        } else {
            const c = C.player.inventorySlotTypings.findIndex(h => h === p.Throwable);
            c !== -1 && this.inputManager.addAction({
                type: L.EquipItem,
                slot: c
            })
        }
    }, a, {
        short: "Switches to the throwable <em>n</em> slots over, where <em>n</em> is some integer.",
        long: "When invoked with an integer argument <em>n</em>, the throwable offset from the current one by <em>n</em> slots will be selected (but the active item won't). If the offset is beyond the slots' range (< 0 or > 2), wrap-around is performed.",
        signatures: [{
            args: [{
                name: "offset",
                type: ["integer"],
                optional: !0
            }],
            noexcept: !1
        }]
    }), F.createCommand("use_consumable", function(r) {
        if (r === void 0) return {
            err: "Expected a string argument, received nothing."
        };
        if (![...Ke, ...me].some(n => n.idString === r)) return {
            err: `No consumable with idString '${r}' exists.`
        };
        a.inputManager.addAction({
            type: L.UseItem,
            item: W.fromString(r)
        })
    }, a, {
        short: "Uses the item designated by the given <code>idString</code>.",
        long: "When invoked with a string argument, if a consumable item of that name exists, it will be used.",
        signatures: [{
            args: [{
                name: "idString",
                type: ["string"]
            }],
            noexcept: !1
        }]
    }), F.createCommand("cancel_action", function() {
        a.inputManager.addAction(L.Cancel)
    }, a, {
        short: "Cancels the action (reloading and or consuming) the player is currently executing",
        long: "When invoked, the current action the player is executing will be stopped, if there is one.",
        signatures: [{
            args: [],
            noexcept: !0
        }]
    }), F.createCommand("toggle_map", function() {
        a.map.toggle()
    }, a, {
        short: "Toggles the game map",
        long: "When invoked, the fullscreen map will be toggled.",
        signatures: [{
            args: [],
            noexcept: !0
        }]
    }), F.createCommand("toggle_minimap", function() {
        d("canvas").hasClass("over-hud") || a.map.toggleMinimap()
    }, a, {
        short: "Toggles the game minimap",
        long: "When invoked, the minimap will be toggled.",
        signatures: [{
            args: [],
            noexcept: !0
        }]
    }), F.createCommand("toggle_hud", function() {
        d("canvas").toggleClass("over-hud"), a.map.visible && a.map.toggleMinimap()
    }, a, {
        short: "Toggles the game HUD",
        long: "When invoked, the Heads Up Display will be toggled.",
        signatures: [{
            args: [],
            noexcept: !0
        }]
    }), F.createCommand("reload", function() {
        a.inputManager.addAction(L.Reload)
    }, a, {
        short: "Reloads the current active item",
        long: "When invoked, the player will attempt to reload the item they're currently holding",
        signatures: [{
            args: [],
            noexcept: !0
        }]
    }), F.createCommand("toggle_console", function() {
        t.toggle()
    }, a, {
        short: "Toggles the game's console.",
        long: "When invoked, this command will close the console if it is open, and will open the console if it is closed.",
        signatures: [{
            args: [],
            noexcept: !0
        }]
    }), F.createInvertiblePair("emote_wheel", function() {
        if (this.gameOver) return;
        const {
            mouseX: r,
            mouseY: n
        } = this.inputManager;
        d("#emote-wheel").css("left", `${r-143}px`).css("top", `${n-143}px`).css("background-image", 'url("./img/misc/emote_wheel.svg")').show(), this.inputManager.emoteWheelActive = !0, this.inputManager.emoteWheelPosition = e.create(r, n)
    }, function() {
        if (this.inputManager.emoteWheelActive) {
            this.inputManager.emoteWheelActive = !1, d("#emote-wheel").hide();
            const r = this.inputManager.selectedEmote;
            r && this.inputManager.addAction(r), this.inputManager.selectedEmote = void 0
        }
    }, a, {
        short: "Opens the emote wheel",
        long: "When invoked, the emote wheel will be opened, allowing the user to pick an emote",
        signatures: [{
            args: [],
            noexcept: !0
        }]
    }, {
        short: "Closes the emote wheel, using the designated emote, if any",
        long: "When invoked, the emote wheel will be closed, and if an emote has been selected, it will be displayed",
        signatures: [{
            args: [],
            noexcept: !0
        }]
    }), F.createCommand("screenshot_map", function() {
        const r = new Tt;
        r.texture = a.map.sprite.texture;
        const n = a.pixi.renderer.extract.canvas(r);
        if (n.toBlob) n.toBlob(c => {
            c && window.open(URL.createObjectURL(c))
        });
        else return {
            err: "canvas.toBlob is undefined"
        };
        r.destroy()
    }, a, {
        short: "Screenshot the game map texture and open it on a new tab as a blob image",
        long: "Attempts to generate a downloadable image from the minimap's contents, then opening that image in a new tab",
        signatures: [{
            args: [],
            noexcept: !1
        }]
    }), F.createCommand("screenshot_game", function() {
        const {
            width: r,
            height: n
        } = a.camera, c = a.camera.container, h = new xe;
        h.beginFill(de.grass), h.drawRect(0, 0, r, n), h.zIndex = -999, c.addChild(h), c.sortChildren();
        const g = new Fi(0, 0, r, n),
            u = a.pixi.renderer.extract.canvas(c, g);
        if (h.destroy(), u.toBlob) u.toBlob(f => {
            f && window.open(URL.createObjectURL(f))
        });
        else return {
            err: "canvas.toBlob is undefined"
        }
    }, a, {
        short: "Screenshot the game camera and open it on a new tab as a blob image",
        long: "Attempts to take a screenshot of the game without any of its HUD elements, and then attempts to open this image in a new tab",
        signatures: [{
            args: [],
            noexcept: !1
        }]
    }), F.createCommand("disconnect", function() {
        this.endGame()
    }, a, {
        short: "Leaves the current game",
        long: "When invoked, the player is disconnected from their current game",
        signatures: [{
            args: [],
            noexcept: !0
        }]
    }), F.createCommand("clear", function() {
        t.clear()
    }, a, {
        short: "Clears the console",
        long: "When invoked, the game console's contents will be erased.",
        signatures: [{
            args: [],
            noexcept: !0
        }]
    }), F.createCommand("echo", function(...r) {
        t.log((r ?? []).join(" "))
    }, a, {
        short: "Echoes whatever is passed to it.",
        long: "When invoked with any number of arguments, the arguments will be re-printed to the console in same order they were given.",
        signatures: [{
            args: [{
                name: "args",
                optional: !0,
                type: ["string[]"],
                rest: !0
            }],
            noexcept: !0
        }]
    }), F.createCommand("bind", function(r, n) {
        if (r === void 0 || n === void 0) return {
            err: `Expected 2 arguments, received ${arguments.length}`
        };
        i.addActionsToInput(r.toUpperCase(), n), t.writeToLocalStorage(), this.inputManager.generateBindsConfigScreen()
    }, a, {
        short: "Binds an input to an action.",
        long: 'Given the name of an input (such as a key or mouse button) and a console query, this command establishes a new link between the two.<br>For alphanumeric keys, simply giving the ley as-is (e.g. "a", or "1") will do. However, keys with no textual representation, or that represent punctuation will have to given by name, such as "Enter" or "Period".<br>Remember that if your query contains spaces, you must enclose the whole query in double quotes ("") so that it is properly parsed.',
        signatures: [{
            args: [{
                name: "input",
                type: ["string"]
            }, {
                name: "query",
                type: ["string"]
            }],
            noexcept: !0
        }]
    }), F.createCommand("unbind", function(r) {
        if (r === void 0) return {
            err: "Expected an argument, received none"
        };
        i.unbindInput(r.toUpperCase()), t.writeToLocalStorage(), this.inputManager.generateBindsConfigScreen()
    }, a, {
        short: "Removes all actions from a given input.",
        long: "Given the name of an input (refer to the <code>bind</code> command for more information on naming), this command removes all actions bound to it.",
        signatures: [{
            args: [{
                name: "input",
                type: ["string"]
            }],
            noexcept: !0
        }]
    }), F.createCommand("unbind_all", function() {
        i.unbindAll(), t.writeToLocalStorage(), this.inputManager.generateBindsConfigScreen()
    }, a, {
        short: "Removes all keybinds.",
        long: "When invoked, all inputs will have their actions removed. <b>This is a very dangerous command!!</b>",
        signatures: [{
            args: [],
            noexcept: !0
        }]
    }), F.createCommand("alias", function(r, n) {
        if (r === void 0 || n === void 0) return {
            err: `Expected 2 arguments, received ${arguments.length}`
        };
        if (t.commands.has(r)) return {
            err: `Cannot override built-in command '${r}'`
        };
        if (t.variables.has(r)) return {
            err: `Cannot shadow cvar '${r}'`
        };
        t.aliases.set(r, n), t.writeToLocalStorage()
    }, a, {
        short: "Creates a shorthand for a console query.",
        long: `This command's first argument is the alias' name, and its second is the query; an <em>alias</em> is created, which can be called like any other command. When the alias is called, the query said alias is bound to will be executed, as if it had been entered into the console manually.<br>If the query contains spaces, remember to wrap the whole thing in double quotes ("") so it can be parsed correctly. An alias' name cannot match that of a built-in command. However, if it matches an existing alias, said existing alias will be replaced by the new one.`,
        signatures: [{
            args: [{
                name: "alias_name",
                type: ["string"]
            }, {
                name: "query",
                type: ["string"]
            }],
            noexcept: !1
        }]
    }), F.createCommand("list_binds", function(r) {
        const n = (c, h) => {
            c !== "" && t.log.raw({
                main: `Actions bound to input '${c}'`,
                detail: h.map(g => g instanceof F ? g.name : g).join("<br>")
            })
        };
        if (r) {
            const c = i.getActionsBoundToInput(r);
            if (c.length) n(r, c);
            else return {
                err: `The input '${r}' hasn't been bound to any action.`
            }
        } else
            for (const c of i.listBoundInputs()) n(c, i.getActionsBoundToInput(c))
    }, a, {
        short: "Lists all the actions bound to a key, or all the keys and their respective actions.",
        long: "If this command is invoked without an argument, all keys which have an action to them will be printed, along with the actions bound to each respective key. If it is invoked with an input's name, then only the actions bound to that input will be shown, if any.",
        signatures: [{
            args: [],
            noexcept: !0
        }, {
            args: [{
                name: "input_name",
                type: ["string"]
            }],
            noexcept: !1
        }]
    }), F.createCommand("list_cvars", () => {
        t.log.raw({
            main: "List of CVars",
            detail: `<ul>${t.variables.dump()}</ul>`
        })
    }, a, {
        short: "",
        long: "",
        signatures: [{
            args: [],
            noexcept: !0
        }]
    }), F.createCommand("let", (r, n, c, h) => {
        if (r === void 0 || n === void 0) return {
            err: `Expected at least 4 arguments, received ${arguments.length}.`
        };
        if (!r.startsWith("uv_")) return {
            err: "Custom CVar name must start with <code>uv_</code>."
        };
        if (!r.match(/^uv_[a-zA-Z0-9_]+$/)) return {
            err: "Custom CVar name be at least one character long (not including the prefix) and can only contain letters, numbers and underscores."
        };
        if (t.variables.has.custom(r)) return {
            err: `Custom CVar '${r}' already exists. (To change its value to ${n}, do <code>${r}=${n}</code>)`
        };
        const g = u => [void 0, "true", "false", "0", "1"].includes(u);
        t.variables.declareCVar(new At(r, n, t, {
            archive: g(c),
            readonly: g(h)
        })), t.writeToLocalStorage()
    }, a, {
        short: "Creates a new custom console variable, with a name and value.",
        long: "When invoked, this command attempts to create a new CVar with the given name and value. <b>Names must being with <code>uv_</code>, must be at least one character long (not counting the prefix) and can only contain letters, numbers and underscores.</b> Invalid names will result in an error.<br>CVars marked as <code>archive</code> will be saved when the game closes and reinitialized when the game boots up again. Readonly CVars cannot have their value changed after being created.",
        signatures: [{
            args: [{
                name: "name",
                type: ["string"]
            }, {
                name: "value",
                type: ["string", "number", "boolean"]
            }, {
                name: "archive",
                type: ["boolean"],
                optional: !0
            }, {
                name: "readonly",
                type: ["boolean"],
                optional: !0
            }],
            noexcept: !1
        }]
    }), F.createCommand("list_alias", function(r) {
        if (r === void 0) return {
            err: "Expected a string argument, received nothing"
        };
        const n = t.aliases.get(r);
        if (n) t.log(`Alias '${r}' is defined as '${n}'`);
        else return {
            err: `No alias named '${r}' exists`
        }
    }, a, {
        short: "Gives the definition of an alias.",
        long: "When given the name of an alias, if that alias exists, this command will print the query associated with it.",
        signatures: [{
            args: [{
                name: "alias_name",
                type: ["string"]
            }],
            noexcept: !1
        }]
    }), F.createCommand("help", function(r) {
        if (r === void 0) {
            t.log({
                main: "List of commands",
                detail: [...t.commands.keys()]
            }), t.log({
                main: "List of aliases",
                detail: [...t.aliases.keys()]
            });
            return
        }
        const n = t.commands.get(r);
        if (!n) return {
            err: `Cannot find command named '${r}'`
        };
        const c = n.info;
        t.log.raw({
            main: c.short,
            detail: [c.long, ...c.signatures.map(h => {
                const g = h.noexcept ? '<span class="command-desc-noexcept">noexcept</span> ' : "",
                    u = `<span class="command-desc-cmd-name">${n.name}</span>`,
                    f = h.args.length ? ` ${h.args.map(x=>`<em>${x.rest?"...":""}${x.name}${x.optional?"?":""}: ${x.type.map(y=>`<span class="command-desc-arg-type">${y}</span>`).join(" | ")}</em>`).join(", ")}` : "";
                return `<code>${g+u+f}</code>`
            })]
        })
    }, a, {
        short: "Displays help about a certain command, or a list of commands and aliases.",
        long: "If given the name of a command, this command logs that command's help info. If not given an argument, this command logs a list of all defined commands and aliases. Passing the name of an alias to this command results in an error.",
        signatures: [{
            args: [],
            noexcept: !0
        }, {
            args: [{
                name: "command_name",
                type: ["string"]
            }],
            noexcept: !1
        }]
    })
}

function Ae(a) {
    return 0 < a && a <= 1 ? 1 : Math.round(a)
}
class Ba {
    constructor(t) {
        s(this, "game");
        s(this, "maxHealth", C.player.defaultHealth);
        s(this, "health", C.player.defaultHealth);
        s(this, "maxAdrenaline", C.player.maxAdrenaline);
        s(this, "minAdrenaline", 0);
        s(this, "adrenaline", 0);
        s(this, "inventory", {
            activeWeaponIndex: 0,
            weapons: new Array(C.player.maxWeapons).fill(void 0),
            items: JSON.parse(JSON.stringify(Je)),
            scope: W.fromString("1x_scope")
        });
        s(this, "ui", {
            ammoCounterContainer: d("#weapon-ammo-container"),
            activeAmmo: d("#weapon-clip-ammo"),
            reserveAmmo: d("#weapon-inventory-ammo"),
            killStreakIndicator: d("#killstreak-indicator-container"),
            killStreakCounter: d("#killstreak-indicator-counter"),
            weaponsContainer: d("#weapons-container"),
            minMaxAdren: d("#adrenaline-bar-min-max"),
            maxHealth: d("#health-bar-max"),
            healthBar: d("#health-bar"),
            healthBarAmount: d("#health-bar-percentage"),
            healthAnim: d("#health-bar-animation"),
            adrenalineBar: d("#adrenaline-bar"),
            adrenalineBarPercentage: d("#adrenaline-bar-percentage"),
            killModal: d("#kill-msg"),
            killFeed: d("#kill-feed"),
            interactMsg: d("#interact-message"),
            interactKey: d("#interact-key")
        });
        s(this, "action", {
            active: !1,
            start: -1,
            time: 0
        });
        s(this, "gameOverScreenTimeout");
        s(this, "skinID");
        s(this, "_killMessageTimeoutID");
        this.game = t
    }
    getPlayerName(t) {
        const i = d("<span>"),
            o = this.game.playerNames.get(t);
        let r;
        return o ? this.game.console.getBuiltInCVar("cv_anonymize_player_names") ? r = C.player.defaultName : (r = o.name, o.hasColor && i.css("color", o.nameColor.toHex())) : (console.warn(`Unknown player name with id ${t}`), r = "[Unknown Player]"), i.text(r), i.prop("outerHTML")
    }
    animateAction(t, i) {
        i > 0 && (this.action.start = Date.now(), d("#action-timer-anim").stop().css({
            "stroke-dashoffset": "226"
        }).animate({
            "stroke-dashoffset": "0"
        }, i * 1e3, "linear", () => {
            d("#action-container").hide(), this.action.active = !1
        })), t && (d("#action-name").text(t), d("#action-container").show()), this.action.active = !0, this.action.time = i
    }
    updateAction() {
        const t = this.action.time - (Date.now() - this.action.start) / 1e3;
        t > 0 && d("#action-time").text(t.toFixed(1))
    }
    cancelAction() {
        d("#action-container").hide().stop(), this.action.active = !1
    }
    showGameOverScreen(t) {
        var r, n;
        const i = this.game;
        d("#interact-message").hide(), d("#spectating-container").hide(), (n = (r = i.activePlayer) == null ? void 0 : r.actionSound) == null || n.stop(), d("#gas-msg").fadeOut(500), d("#joysticks-containers").hide();
        const o = d("#game-over-overlay");
        i.gameOver = !0, t.won ? d("#btn-spectate").hide() : (d("#btn-spectate").removeClass("btn-disabled").show(), i.map.indicator.setFrame("player_indicator_dead").setRotation(0)), d("#chicken-dinner").toggle(t.won), d("#game-over-text").html(t.won ? "Winner winner chicken dinner!" : `${this.game.spectating?this.getPlayerName(t.playerID):"You"} died.`), d("#game-over-player-name").html(this.getPlayerName(t.playerID)), d("#game-over-kills").text(t.kills), d("#game-over-damage-done").text(t.damageDone), d("#game-over-damage-taken").text(t.damageTaken), d("#game-over-time").text(ki(t.timeAlive)), t.won && i.music.play(), this.gameOverScreenTimeout = window.setTimeout(() => o.fadeIn(500), 500), d("#game-over-rank").text(`#${t.rank}`).toggleClass("won", t.won)
    }
    updateUI(t) {
        if (t.id !== void 0 && (this.game.activePlayerID = t.id), t.dirty.id && (this.game.spectating = t.spectating, t.spectating && (d("#game-over-overlay").fadeOut(), d("#spectating-msg-player").html(this.getPlayerName(t.id))), d("#spectating-container").toggle(t.spectating)), t.zoom && (this.game.camera.zoom = t.zoom), t.dirty.maxMinStats && (this.maxHealth = t.maxHealth, this.minAdrenaline = t.minAdrenaline, this.maxAdrenaline = t.maxAdrenaline, this.maxHealth === C.player.defaultHealth ? this.ui.maxHealth.text("").hide() : this.ui.maxHealth.text(Ae(this.maxHealth)).show(), this.maxAdrenaline === C.player.maxAdrenaline && this.minAdrenaline === 0 ? this.ui.minMaxAdren.text("").hide() : this.ui.minMaxAdren.text(`${this.minAdrenaline===0?"":`${Ae(this.minAdrenaline)}/`}${Ae(this.maxAdrenaline)}`).show()), t.dirty.health) {
            const o = this.health;
            this.health = t.health;
            const r = 100 * this.health / this.maxHealth,
                n = Ae(r);
            this.ui.healthBar.width(`${r}%`), o > this.health && this.ui.healthAnim.width(`${r}%`), this.ui.healthBarAmount.text(Ae(this.health)), n === 100 ? this.ui.healthBar.css("background-color", "#bdc7d0") : n < 60 && n > 25 ? this.ui.healthBar.css("background-color", `rgb(255, ${(n-10)*4}, ${(n-10)*4})`) : n <= 25 ? this.ui.healthBar.css("background-color", "#ff0000") : this.ui.healthBar.css("background-color", "#f8f9fa"), this.ui.healthBar.toggleClass("flashing", n <= 25), this.ui.healthBarAmount.css("color", n <= 40 ? "#ffffff" : "#000000")
        }
        if (t.dirty.adrenaline) {
            this.adrenaline = t.adrenaline;
            const o = 100 * this.adrenaline / this.maxAdrenaline;
            this.ui.adrenalineBar.width(`${o}%`), this.ui.adrenalineBarPercentage.text(Ae(this.adrenaline)).css("color", this.adrenaline < 7 ? "#ffffff" : "#000000")
        }
        const i = t.inventory;
        i.weapons && (this.inventory.weapons = i.weapons, this.inventory.activeWeaponIndex = i.activeWeaponIndex), i.items && (this.inventory.items = i.items, this.inventory.scope = i.scope, this.updateItems()), (i.weapons || i.items) && this.updateWeapons()
    }
    updateWeapons() {
        var c;
        const t = this.inventory,
            i = t.activeWeaponIndex,
            o = t.weapons[i],
            r = o == null ? void 0 : o.count;
        if (o === void 0 || r === void 0 || _t) this.ui.ammoCounterContainer.hide();
        else {
            this.ui.ammoCounterContainer.show(), this.ui.activeAmmo.text(r).css("color", r > 0 ? "inherit" : "red");
            let h = !1;
            if (o.definition.itemType === p.Gun) {
                const g = o.definition.ammoType;
                let u = this.inventory.items[g];
                for (const f of lt)
                    if (f.idString === g && f.ephemeral) {
                        u = "∞";
                        break
                    } h = u !== 0, this.ui.reserveAmmo.show().text(u)
            }
            this.ui.ammoCounterContainer.toggleClass("has-reserve", h), h || this.ui.reserveAmmo.hide()
        }((c = o == null ? void 0 : o.stats) == null ? void 0 : c.kills) === void 0 ? this.ui.killStreakIndicator.hide() : (this.ui.killStreakIndicator.show(), this.ui.killStreakCounter.text(`Streak: ${o.stats.kills}`));
        const n = C.player.maxWeapons;
        for (let h = 0; h < n; h++) {
            const g = d(`#weapon-slot-${h+1}`),
                u = t.weapons[h];
            if (u) {
                g.addClass("has-item").children(".item-name").text(u.definition.name);
                const f = u.definition.idString === "fists";
                g.children(".item-image").css("background-image", f ? `url(./img/game/skins/${this.skinID??this.game.console.getBuiltInCVar("cv_loadout_skin")}_fist.svg)` : "none").toggleClass("is-fists", f).attr("src", `./img/game/weapons/${u.definition.idString}.svg`).show(), u.count !== void 0 && g.children(".item-ammo").text(u.count).css("color", u.count > 0 ? "inherit" : "red")
            } else g.removeClass("has-item"), g.children(".item-name").text(""), g.children(".item-image").removeAttr("src").hide(), g.children(".item-ammo").text("")
        }
        this.ui.weaponsContainer.children(".inventory-slot").removeClass("active"), d(`#weapon-slot-${this.inventory.activeWeaponIndex+1}`).addClass("active")
    }
    updateItems() {
        for (const t in this.inventory.items) {
            const i = this.inventory.items[t],
                o = W.fromString(t);
            d(`#${t}-count`).text(i);
            const r = d(`#${t}-slot`);
            if (this.game.activePlayer) {
                const n = this.game.activePlayer.equipment.backpack;
                r.toggleClass("full", i >= n.maxCapacity[t])
            }
            r.toggleClass("has-item", i > 0), o.itemType === p.Ammo && o.hideUnlessPresent && r.css("visibility", i > 0 ? "visible" : "hidden"), o.itemType === p.Scope && !_t && r.toggle(i > 0).removeClass("active")
        }
        d(`#${this.inventory.scope.idString}-slot`).addClass("active")
    }
    _addKillMessage(t, i, o, r) {
        const n = `Kills: ${t}`;
        d("#ui-kills").text(t), d("#kill-msg-kills").text(n), d("#kill-msg-player-name").html(i), d("#kill-msg-weapon-used").text(` with ${o}${r?` (streak: ${r})`:""}`), this.ui.killModal.fadeIn(350, () => {
            clearTimeout(this._killMessageTimeoutID), this._killMessageTimeoutID = window.setTimeout(() => {
                this.ui.killModal.fadeOut(350)
            }, 3e3)
        })
    }
    _addKillFeedMessage(t, i) {
        const o = d('<div class="kill-feed-item">');
        for (o.html(t), o.addClass(i), this.ui.killFeed.prepend(o); this.ui.killFeed.children().length > 5;) this.ui.killFeed.children().last().remove();
        setTimeout(() => o.fadeOut(1e3, o.remove.bind(o)), 7e3)
    }
    processKillFeedMessage(t) {
        const {
            messageType: i,
            playerID: o,
            killType: r,
            killerID: n,
            kills: c,
            weaponUsed: h,
            killstreak: g,
            hideInKillfeed: u
        } = t, f = h !== void 0, x = f && "itemType" in h && h.itemType === p.Throwable, y = o !== void 0 ? this.getPlayerName(o) : "";
        let S;
        const v = [];
        switch (i) {
            case ie.Kill: {
                const T = g > 1;
                switch (this.game.console.getBuiltInCVar("cv_killfeed_style")) {
                    case "text": {
                        let z = "";
                        switch (r) {
                            case re.Suicide:
                                z = `${y} committed suicide`;
                                break;
                            case re.TwoPartyInteraction:
                                z = `${this.getPlayerName(n)} killed ${y}`;
                                break;
                            case re.Gas:
                                z = `${y} died to the gas`;
                                break;
                            case re.Airdrop:
                                z = `${y} was crushed by an airdrop`;
                                break
                        }
                        const _ = f ? `${"dual"in t&&t.dual?"Dual ":""}${h.name}` : "",
                            I = `a${"aeiou".includes(_[0])?"n":""}`,
                            w = f ? ` with ${x?`the impact of ${I} `:""}${_}` : "";
                        S = `
                        ${T?g:""}
                        <img class="kill-icon" src="./img/misc/skull_icon.svg" alt="Skull">
                        ${z}${w}`;
                        break
                    }
                    case "icon": {
                        const z = r === re.TwoPartyInteraction ? this.getPlayerName(n) : "";
                        let _ = "";
                        switch (r) {
                            case re.Gas:
                                _ = "gas";
                                break;
                            case re.Airdrop:
                                _ = "airdrop";
                                break;
                            default:
                                _ = (h == null ? void 0 : h.idString) ?? "";
                                break
                        }
                        const I = h ? h.name : _,
                            w = T ? `
                            <span style="font-size: 80%">(${g}
                                <img class="kill-icon" src="./img/misc/skull_icon.svg" alt="Skull" height=12>)
                            </span>` : "";
                        S = `
                        ${z}
                        <img class="kill-icon" src="./img/killfeed/${_}_killfeed.svg" alt="${I}">
                        ${w}
                        ${y}`;
                        break
                    }
                }
                switch (!0) {
                    case o === this.game.activePlayerID: {
                        v.push("kill-feed-item-victim");
                        break
                    }
                    case n === this.game.activePlayerID: {
                        v.push("kill-feed-item-killer"), this._addKillMessage(c, y, (h == null ? void 0 : h.name) ?? "", g);
                        break
                    }
                }
                break
            }
            case ie.KillLeaderAssigned: {
                o === this.game.activePlayerID && v.push("kill-feed-item-killer"), d("#kill-leader-leader").html(y), d("#kill-leader-kills-counter").text(c), u || (S = `<i class="fa-solid fa-crown"></i> ${y} promoted to Kill Leader!`, this.game.soundManager.play("kill_leader_assigned")), d("#btn-spectate-kill-leader").show();
                break
            }
            case ie.KillLeaderUpdated: {
                d("#kill-leader-kills-counter").text(c);
                break
            }
            case ie.KillLeaderDead: {
                d("#kill-leader-leader").text("Waiting for leader"), d("#kill-leader-kills-counter").text("0"), S = `<img class="kill-icon" src="./img/misc/skull_icon.svg" alt="Skull"> ${n?`${this.getPlayerName(n)} killed Kill Leader!`:"The Kill Leader is dead!"}`, n === this.game.activePlayerID ? v.push("kill-feed-item-killer") : o === this.game.activePlayerID && v.push("kill-feed-item-victim"), this.game.soundManager.play("kill_leader_dead"), d("#btn-spectate-kill-leader").hide();
                break
            }
        }
        S && this._addKillFeedMessage(S, v)
    }
}
const Aa = {
    [D.Player]: $e,
    [D.Obstacle]: ne,
    [D.DeathMarker]: fa,
    [D.Loot]: Fe,
    [D.Building]: da,
    [D.Decal]: wa,
    [D.Parachute]: ya,
    [D.ThrowableProjectile]: ba,
    [D.SyncedParticle]: Sa
};
class Fa {
    constructor() {
        s(this, "_socket");
        s(this, "objects", new ra);
        s(this, "bullets", new Set);
        s(this, "planes", new Set);
        s(this, "playerNames", new Map);
        s(this, "activePlayerID", -1);
        s(this, "gameStarted", !1);
        s(this, "gameOver", !1);
        s(this, "spectating", !1);
        s(this, "error", !1);
        s(this, "uiManager", new Ba(this));
        s(this, "lastPingDate", 0);
        s(this, "_tickTimeoutID");
        s(this, "pixi");
        s(this, "soundManager");
        s(this, "particleManager", new ma(this));
        s(this, "map");
        s(this, "camera");
        s(this, "console", new Ca(this));
        s(this, "inputManager", new pi(this));
        s(this, "gasRender", new zi(N));
        s(this, "gas", new za(this));
        s(this, "music");
        s(this, "tweens", new Set);
        s(this, "_timeouts", new Set);
        s(this, "tick", (() => {
            const t = {};
            let i = !1;
            return () => {
                var S, v, T, z, _, I, w, m, k;
                if (!this.gameStarted || this.gameOver && !this.spectating) return;
                this.inputManager.update(), this.soundManager.update();
                const o = this.activePlayer;
                if (!o) return;
                for (const M of this.objects.getCategory(D.Building)) M.toggleCeiling();
                const r = this.uiManager.action.active;
                let n = !0;
                r && this.uiManager.updateAction();
                const c = {
                        object: void 0,
                        minDist: Number.MAX_VALUE
                    },
                    h = {
                        object: void 0,
                        minDist: Number.MAX_VALUE
                    },
                    g = new b(3, o.position);
                for (const M of this.objects)
                    if ((M instanceof Fe || M instanceof ne && M.canInteract(o)) && M.hitbox.collidesWith(g)) {
                        const A = Me.distanceSquared(M.position, o.position);
                        (M instanceof ne || M.canInteract(o)) && A < c.minDist ? (c.minDist = A, c.object = M) : M instanceof Fe && A < h.minDist && (h.minDist = A, h.object = M)
                    } const u = c.object ?? h.object,
                    f = u instanceof ne ? (S = u.door) == null ? void 0 : S.offset : void 0;
                n = c.object !== void 0;
                const x = this.inputManager.binds.getInputsBoundToAction(u === void 0 ? "cancel_action" : "interact")[0],
                    y = {
                        object: ((v = t.object) == null ? void 0 : v.id) !== (u == null ? void 0 : u.id),
                        offset: t.offset !== f,
                        isAction: t.isAction !== r,
                        bind: t.bind !== x,
                        canInteract: t.canInteract !== n
                    };
                if (y.bind && (i = !1), y.object || y.offset || y.isAction || y.bind || y.canInteract) {
                    t.object = u, t.offset = f, t.isAction = r, t.bind = x, t.canInteract = n;
                    const {
                        interactKey: M,
                        interactMsg: A
                    } = this.uiManager.ui, q = (T = u == null ? void 0 : u.definition) == null ? void 0 : T.itemType;
                    if ((this.inputManager.isMobile ? u instanceof Fe && (q === p.Gun || q === p.Melee || q === p.Skin) || u instanceof ne : u !== void 0) || r) {
                        if (y.object || y.offset || y.isAction) {
                            let ee;
                            switch (!0) {
                                case u instanceof ne: {
                                    switch (u.definition.role) {
                                        case H.Door:
                                            ee = ((z = u.door) == null ? void 0 : z.offset) === 0 ? "Open Door" : "Close Door";
                                            break;
                                        case H.Activatable:
                                            ee = `${u.definition.interactText} ${u.definition.name}`;
                                            break
                                    }
                                    break
                                }
                                case u instanceof Fe: {
                                    ee = `${u.definition.name}${u.count>1?` (${u.count})`:""}`;
                                    break
                                }
                                case r: {
                                    ee = "Cancel";
                                    break
                                }
                            }
                            ee && d("#interact-text").text(ee)
                        }
                        if (!this.inputManager.isMobile && (!i || u === void 0 && r)) {
                            i = !0;
                            const ee = pi.getIconFromInputName(x);
                            ee === void 0 ? M.text(x) : M.html(`<img src="${ee}" alt="${x}"/>`)
                        }
                        n || u === void 0 && r ? M.addClass("active").show() : M.removeClass("active").hide(), A.show()
                    } else A.hide();
                    this.inputManager.isMobile && n && (u instanceof Fe && (q !== p.Melee || ((I = (_ = this.uiManager.inventory.weapons) == null ? void 0 : _[2]) == null ? void 0 : I.definition.idString) === "fists") && (q !== p.Gun || !((w = this.uiManager.inventory.weapons) != null && w[0]) || !((m = this.uiManager.inventory.weapons) != null && m[1])) && q !== p.Skin || u instanceof ne && u.canInteract(o) && ((k = u.door) == null ? void 0 : k.offset) === 0) && this.inputManager.addAction(L.Interact)
                }
            }
        })());
        this.console.readFromLocalStorage(), this.inputManager.setupInputs(), this.pixi = new Oi({
            resizeTo: window,
            background: de.grass,
            antialias: this.console.getBuiltInCVar("cv_antialias"),
            autoDensity: !0,
            resolution: window.devicePixelRatio || 1
        }), d("#game-ui").append(this.pixi.view), this.pixi.ticker.add(this.render.bind(this)), Da(this), this.soundManager = new ha(this), this.inputManager.generateBindsConfigScreen(), Ta(this), this.camera = new xa(this), this.map = new Ma(this), this.music = Ie.add("menu_music", {
            url: `../audio/music/menu_music${this.console.getBuiltInCVar("cv_use_old_menu_music")?"_old":we.specialMenuMusic?`_${we.idString}`:""}.mp3`,
            singleInstance: !0,
            preload: !0,
            autoPlay: !0,
            volume: this.console.getBuiltInCVar("cv_music_volume")
        }), setInterval(() => {
            this.console.getBuiltInCVar("pf_show_fps") && d("#fps-counter").text(`${Math.round(this.pixi.ticker.FPS)} fps`)
        }, 500)
    }
    get activePlayer() {
        return this.objects.get(this.activePlayerID)
    }
    addTimeout(t, i) {
        const o = new Gi(t, Date.now() + (i ?? 0));
        return this._timeouts.add(o), o
    }
    connect(t) {
        this.error = !1, !this.gameStarted && (this._socket = new WebSocket(t), this._socket.binaryType = "arraybuffer", this._socket.onopen = () => {
            this.music.stop(), this.gameStarted = !0, this.gameOver = !1, this.spectating = !1, clearTimeout(this.uiManager.gameOverScreenTimeout), d("#game-over-overlay").hide(), d("#kill-msg").hide(), d("#ui-kills").text("0"), d("#kill-feed").html(""), d("#spectating-container").hide(), d("#joysticks-containers").show(), this.sendPacket(new ei), this.lastPingDate = Date.now();
            const i = new Ji;
            i.isMobile = this.inputManager.isMobile, i.name = this.console.getBuiltInCVar("cv_player_name"), i.skin = W.fromString(this.console.getBuiltInCVar("cv_loadout_skin"));
            for (const o of ["top", "right", "bottom", "left"]) i.emotes.push(Pe.fromString(this.console.getBuiltInCVar(`cv_loadout_${o}_emote`)));
            this.sendPacket(i), this.camera.addObject(this.gasRender.graphics), this.map.indicator.setFrame("player_indicator"), this._tickTimeoutID = window.setInterval(this.tick.bind(this), C.msPerTick)
        }, this._socket.onmessage = i => {
            const o = new ct(i.data);
            switch (o.readPacketType()) {
                case Z.Joined: {
                    const r = new Ki;
                    r.deserialize(o), this.startGame(r);
                    break
                }
                case Z.Map: {
                    const r = new Yi;
                    r.deserialize(o), this.map.updateFromPacket(r);
                    break
                }
                case Z.Update: {
                    const r = new oa;
                    r.previousData = this.uiManager, r.deserialize(o), this.processUpdate(r);
                    break
                }
                case Z.GameOver: {
                    const r = new Zi;
                    r.deserialize(o), this.uiManager.showGameOverScreen(r);
                    break
                }
                case Z.Ping: {
                    const r = Date.now() - this.lastPingDate;
                    d("#ping-counter").text(`${r} ms`), setTimeout(() => {
                        this.sendPacket(new ei), this.lastPingDate = Date.now()
                    }, 5e3);
                    break
                }
                case Z.Report: {
                    const r = new Qi;
                    r.deserialize(o), d("#reporting-name").text(r.playerName), d("#report-id").text(r.reportID), d("#report-modal").fadeIn(250);
                    break
                }
                case Z.Pickup: {
                    const r = new Xi;
                    r.deserialize(o);
                    let n;
                    switch (r.item.itemType) {
                        case p.Ammo:
                            n = "ammo_pickup";
                            break;
                        case p.Healing:
                            n = `${r.item.idString}_pickup`;
                            break;
                        case p.Scope:
                            n = "scope_pickup";
                            break;
                        case p.Armor:
                            r.item.armorType === at.Helmet ? n = "helmet_pickup" : n = "vest_pickup";
                            break;
                        case p.Backpack:
                            n = "backpack_pickup";
                            break;
                        case p.Throwable:
                            n = "throwable_pickup";
                            break;
                        default:
                            n = "pickup";
                            break
                    }
                    this.soundManager.play(n);
                    break
                }
            }
        }, this._socket.onerror = () => {
            this.error = !0, d("#splash-server-message-text").html("Error joining game."), d("#splash-server-message").show(), Le()
        }, this._socket.onclose = () => {
            Le(), this.gameOver || (this.gameStarted && (d("#splash-ui").fadeIn(), d("#splash-server-message-text").html("Connection lost."), d("#splash-server-message").show()), d("#btn-spectate").addClass("btn-disabled"), this.error || this.endGame())
        })
    }
    startGame(t) {
        t.protocolVersion !== C.protocolVersion && (alert("Invalid game version."), location.search = `t=${Date.now()}`);
        const i = [".emote-top", ".emote-right", ".emote-bottom", ".emote-left"];
        for (let o = 0; o < 4; o++) d(`#emote-wheel > ${i[o]}`).css("background-image", `url("./img/game/emotes/${t.emotes[o].idString}.svg")`);
        d("canvas").addClass("active"), d("#splash-ui").fadeOut(Le), d("#kill-leader-leader").html("Waiting for leader"), d("#kill-leader-kills-counter").text("0"), d("#btn-spectate-kill-leader").hide()
    }
    endGame() {
        var t;
        clearTimeout(this._tickTimeoutID), this.soundManager.stopAll(), d("#action-container").hide(), d("#game-menu").hide(), d("#game-over-overlay").hide(), d("canvas").removeClass("active"), d("#kill-leader-leader").text("Waiting for leader"), d("#kill-leader-kills-counter").text("0"), d("#splash-ui").fadeIn(), this.gameStarted = !1, (t = this._socket) == null || t.close();
        for (const i of this.objects) i.destroy();
        for (const i of this.planes) i.destroy();
        this.objects.clear(), this.bullets.clear(), this.planes.clear(), this.camera.container.removeChildren(), this.particleManager.clear(), this.map.gasGraphics.clear(), this.map.pings.clear(), this.map.pingsContainer.removeChildren(), this.playerNames.clear(), this._timeouts.clear(), this.camera.zoom = me.definitions[0].zoomLevel, this.music.play()
    }
    sendPacket(t) {
        t.serialize(), this.sendData(t.getBuffer())
    }
    sendData(t) {
        var i;
        try {
            (i = this._socket) == null || i.send(t)
        } catch (o) {
            console.warn("Error sending packet. Details:", o)
        }
    }
    render() {
        if (!this.gameStarted) return;
        const t = this.pixi.ticker.deltaMS,
            i = Date.now();
        for (const o of this._timeouts) {
            if (o.killed) {
                this._timeouts.delete(o);
                continue
            }
            i > o.end && (o.callback(), this._timeouts.delete(o))
        }
        //clear arr
        window.enemies = {}
        //i think this is the function that calls like animation frame or smth
        //nameoverlay
        var players = Array.from(this.playerNames.values());
        var name_overlay = document.createElement("div");
        name_overlay.style.fontSize = "10px";
        for(var k = 0; k<players.length; k++){
            var name = document.createElement("div");
            var currstr = players[k]["name"];
            Array.from(this.objects._byCategory[0]).forEach(function(element){
                if(element.id == Array.from(this.playerNames.keys())[k] && !element.dead){
                    //also do no select (no clickthrough), remove stale elements etc
                    //better position handling and coloring
                    try{
                        var onsc = window.calcPosOnScreen(element._position)
                    }
                    catch{
                        onsc = {x: 0, y: 0};
                    }
                    var nametag = document.createElement("div");
                    nametag.style.position = "absolute";
                    nametag.style.zIndex = "999999999999";
                    //jittery a lot, lets just smooth it with this
                    nametag.style.transitionDuration = "0.05s";
                    nametag.style.fontWeight = "bold";
                    if(element.id != this.activePlayerID){
                        nametag.style.color = "black";
                        window.enemies[element.id] = {
                            new: element._position,
                            old: element._oldPosition
                        }
                    }
                    else{
                        nametag.style.color = "white";
                        window.self_coords = element._position;
                    }
                    nametag.innerText = currstr;
                    nametag.setAttribute("class", "nametag");
                    nametag.style.pointerEvents = "none";
                    nametag.id = currstr;
                    if(document.getElementById(currstr)){
                        document.getElementById(currstr).remove();
                    }
                    document.body.appendChild(nametag);
                    nametag.style.left = (onsc.x - Math.round(nametag.clientWidth/2)).toString() + "px";
                    nametag.style.top = (onsc.y - 70*this.camera.zoomTween.target._y).toString() + "px";
                    currstr += " (" + Math.round(element._position.x).toString() + ", " + Math.round(element._position.y).toString() + ")";
                }

            }.bind(this))
            name.innerHTML = currstr;
            name_overlay.appendChild(name);
        }
        name_overlay.id = "nameOverlay";
        if(!document.querySelector("#nameOverlay")){
            document.querySelector("#debug-hud").appendChild(name_overlay);
        }
        else{
            document.querySelector("#nameOverlay").outerHTML = name_overlay.outerHTML;
        }
        if (this.console.getBuiltInCVar("cv_movement_smoothing")) {
            for (const o of this.objects.getCategory(D.Player)) o.updateContainerPosition(), (!o.isActivePlayer || !this.console.getBuiltInCVar("cv_responsive_rotation") || this.spectating) && o.updateContainerRotation();
            this.activePlayer && (this.camera.position = this.activePlayer.container.position);
            for (const o of this.objects.getCategory(D.Loot)) o.updateContainerPosition();
            for (const o of this.objects.getCategory(D.ThrowableProjectile)) o.updateContainerPosition(), o.updateContainerRotation();
            for (const o of this.objects.getCategory(D.SyncedParticle)) o.updateContainerPosition(), o.updateContainerRotation(), o.updateContainerScale()
        }
        for (const o of this.tweens) o.update();
        for (const o of this.bullets) o.update(t);
        this.particleManager.update(t), this.map.update(), this.gasRender.update(this.gas);
        for (const o of this.planes) o.update();
        this.camera.update()
    }
    processUpdate(t) {
        for (const o of t.newPlayers) this.playerNames.set(o.id, {
            name: o.name,
            hasColor: o.hasColor,
            nameColor: new It(o.nameColor)
        });
        const i = t.playerData;
        i && this.uiManager.updateUI(i);
        for (const o of t.deletedPlayers) this.playerNames.delete(o);
        for (const {
                id: o,
                type: r,
                data: n
            }
            of t.fullDirtyObjects) {
            const c = this.objects.get(o);
            (c === void 0 || c.destroyed) && this.objects.add(new Aa[r](this, o, n)), c && c.updateFromData(n, !1)
        }
        for (const {
                id: o,
                data: r
            }
            of t.partialDirtyObjects) {
            const n = this.objects.get(o);
            n && n.updateFromData(r, !1)
        }
        for (const o of t.deletedObjects) {
            const r = this.objects.get(o);
            if (r === void 0) {
                console.warn(`Trying to delete unknown object with ID ${o}`);
                continue
            }
            r.destroy(), this.objects.delete(r)
        }
        for (const o of t.deserializedBullets) this.bullets.add(new ga(this, o));
        for (const o of t.explosions) _a(this, o.definition, o.position);
        for (const o of t.emotes) {
            const r = this.objects.get(o.playerID);
            r instanceof $e ? r.emote(o.definition) : console.warn(`Tried to emote on behalf of ${r===void 0?"a non-existant player":`a/an ${D[r.type]}`}`)
        }
        this.gas.updateFrom(t), t.aliveCount !== void 0 && (d("#ui-players-alive").text(t.aliveCount), d("#btn-spectate").toggle(t.aliveCount > 1));
        for (const o of t.killFeedMessages) this.uiManager.processKillFeedMessage(o);
        for (const o of t.planes) this.planes.add(new vt(this, o.position, o.direction));
        for (const o of t.mapPings) this.soundManager.play("airdrop_ping"), this.map.pings.add(new Ra(o))
    }
}
const Ft = d("#btn-play-solo");

function Le() {
    Ft.removeClass("btn-disabled").prop("disabled", !1).text("Play Solo")
}

function Oa(a) {
    Ft.addClass("btn-disabled").prop("disabled", !0).html(`<span style="position: relative; bottom: 1px;"><div class="spin"></div>${a}</span>`)
}
d(async () => {
    const a = new Fa;
    sa().then(Le);
    const t = ht.regions,
        i = Object.entries(t),
        o = d("#server-list");
    for (const [z, _] of i) {
        const I = d(`
                <li class="server-list-item" data-region="${z}">
                    <span class="server-name">${_.name}</span>
                    <span style="margin-left: auto">
                      <img src="./img/misc/player_icon.svg" width="16" height="16" alt="Player count">
                      <span class="server-player-count">-</span>
                    </span>
                </li>
            `);
        o.append(I)
    }
    let r = Number.MAX_VALUE,
        n;
    const c = async () => {
        var z;
        for (const [_, I] of i) {
            const w = d(`.server-list-item[data-region=${_}]`);
            try {
                const m = Date.now();
                let k = await ((z = await fetch(`http${I.https?"s":""}://${I.address}/api/playerCount`, {
                    signal: AbortSignal.timeout(2e3)
                }).catch(() => {
                    console.error(`Could not load player count for ${I.address}.`)
                })) == null ? void 0 : z.text());
                k = k && ka(k) ? k : "-";
                const M = Date.now() - m;
                t[_] = {
                    ...I,
                    playerCount: k,
                    ping: k !== "-" ? M : -1
                }, w.find(".server-player-count").text(k), M < r && (r = M, n = _)
            } catch (m) {
                w.addClass("server-list-item-disabled"), console.error(`Failed to fetch player count for region ${_}. Details:`, m)
            }
        }
    };
    let h;
    const g = () => {
            h || (h = t[ht.defaultRegion], a.console.setBuiltInCVar("cv_region", void 0)), d("#server-name").text(h.name), d("#server-player-count").text(h.playerCount ?? "-")
        },
        u = a.console.getBuiltInCVar("cv_region");
    u ? ((async () => (await c(), h = t[u], g()))(), h = t[u]) : (await c(), h = t[n ?? ht.defaultRegion]), g(), o.children("li.server-list-item").on("click", function() {
        const z = this.getAttribute("data-region");
        if (z === null) return;
        const _ = t[z];
        _ !== void 0 && (h = _, a.console.setBuiltInCVar("cv_region", z), g())
    });
    let f = 0;
    Ft.on("click", () => {
        const z = Date.now();
        if (z - f < 1500) return;
        f = z, Oa("Connecting...");
        const _ = `${h.https?"s":""}://${h.address}`;
        d.get(`http${_}/api/getGame`, I => {
            if (I.success) {
                let w = `ws${_}/play?gameID=${I.gameID}`;
                const m = a.console.getBuiltInCVar("dv_password"),
                    k = a.console.getBuiltInCVar("dv_role"),
                    M = a.console.getBuiltInCVar("dv_lobby_clearing");
                m && (w += `&password=${m}`), k && (w += `&role=${k}`), M && (w += "&lobbyClearing=true");
                const A = a.console.getBuiltInCVar("dv_name_color");
                if (A) try {
                    const q = new It(A).toNumber();
                    w += `&nameColor=${q}`
                } catch (q) {
                    a.console.setBuiltInCVar("dv_name_color", ""), console.error(q)
                }
                a.connect(w), d("#splash-server-message").hide()
            } else {
                let w = !1,
                    m, k;
                switch (I.message) {
                    case "rateLimit":
                        k = "Error joining game.<br>Please try again in a few minutes.";
                        break;
                    case "warning":
                        w = !0, m = "Teaming is against the rules!", k = "You have been reported for teaming. Allying with other players for extended periods is not allowed. If you continue to team, you will be banned.";
                        break;
                    case "tempBan":
                        w = !0, m = "You have been banned for 1 day for teaming!", k = "Remember, allying with other players for extended periods is not allowed!<br><br>When your ban is up, reload the page to clear this message.";
                        break;
                    case "permaBan":
                        w = !0, m = "You have been permanently banned for hacking!", k = "The use of scripts, plugins, extensions, etc. to modify the game in order to gain an advantage over opponents is strictly forbidden.";
                        break;
                    default:
                        k = "Error joining game.<br>Please try again in 30 seconds.";
                        break
                }
                Le(), w ? (d("#warning-modal-title").text(m ?? ""), d("#warning-modal-text").html(k ?? ""), d("#warning-modal-agree-options").toggle(I.message === "warning"), d("#warning-modal-agree-checkbox").prop("checked", !1), d("#warning-modal").show(), d("#btn-play-solo").addClass("btn-disabled")) : (d("#splash-server-message-text").html(k), d("#splash-server-message").show())
            }
        }).fail(() => {
            d("#splash-server-message-text").html("Error finding game.<br>Please try again."), d("#splash-server-message").show(), Le()
        })
    });
    const x = new URLSearchParams(window.location.search),
        y = x.get("nameColor");
    y && a.console.setBuiltInCVar("dv_name_color", y);
    const S = x.get("lobbyClearing");
    S && a.console.setBuiltInCVar("dv_lobby_clearing", S === "true");
    const v = x.get("password");
    v && (a.console.setBuiltInCVar("dv_password", v), location.search = "");
    const T = x.get("role");
    T && (a.console.setBuiltInCVar("dv_role", T), location.search = "")
});
let qe = "";
for (const a of Hi.slice(0, 5)) {
    const t = new Date(a.date).toLocaleDateString("default", {
        month: "long",
        day: "numeric",
        year: "numeric"
    });
    qe += '<article class="splash-news-entry">', qe += `<div class="news-date">${t}</div>`, qe += `<div class="news-title">${a.title}</div>`, qe += `<p>${a.content}<br><i>- ${a.author}</i></p></article>`
}
d("#news-posts").html(qe);