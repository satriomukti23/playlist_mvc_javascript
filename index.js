const command = process.argv[2];
const params = process.argv.slice(3);
const PlaylistController = require('./controller/PlaylistController');

// console.log(command);
// console.log(params);


switch(command){
    case 'add':
        PlaylistController.addPlaylist(params);
        break;
    case 'remove':
        PlaylistController.removePlaylist(params);
        break;
    case 'make':
        PlaylistController.makePlaylist(params);
        break;
    case 'showPlaylist':    
        PlaylistController.showPlaylist();
        break;
    default:
        console.log("tidak ditemukan");
        break;
}  


// class playlist {
//     constructor(name,songs){
//         this.name = name;
//         this.songs = songs;
//     }
// }

// class Song {
//     constructor(name,duration){
//         this.name = name;
//         this.duration = duration;
//     }
// }

// class Pop extends Song{
//     constructor(name,duration,genre){
//         super(name,duration);
//         this.genre = genre;
//     }
// }

// class Rock extends Song{
//     constructor(name,duration,genre){
//         super(name,duration);
//         this.genre = genre;
//     }
// }
