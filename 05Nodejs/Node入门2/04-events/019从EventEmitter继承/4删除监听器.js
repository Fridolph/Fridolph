// 如果想要移除一个监听器，那么一个监听的引用是不可或缺的
function play(track) {
  this.playing = false; 
}

musicPlayer.on('play', play);

musicPlayer.removeListener('play', play);