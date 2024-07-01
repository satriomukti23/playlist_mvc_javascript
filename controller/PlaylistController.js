const Playlist = require('../model/Playlist');

class PlaylistController{
    static showPlaylist(){
        Playlist.showPlaylist();
    }
    static addPlaylist(params){
        Playlist.addPlaylist(params);
    }
    static removePlaylist(params){
        Playlist.removePlaylist(params);
    }
    static makePlaylist(params){
        Playlist.makePlaylist(params);
    }
}

module.exports = PlaylistController;    