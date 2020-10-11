
window.onload = ()=>{

  // canvas準備
  const canvas = document.querySelector('#board');  //getElementById()等でも可。オブジェクトが取れれば良い。
  const ctx = canvas.getContext('2d');
  ctx.textAlign = 'center';

  // 文字列表示座標
  const textX = 330;
  const textY = 200;

  // 背景画像
  const baseImage = new Image();
  baseImage.src = 'base.png';  // 画像のURLを指定
  baseImage.onload = () => {
    ctx.drawImage(baseImage, 0, 0);
    ctx.font = '30px serif';
    ctx.fillText('メッセージを入力してね！', textX, textY);
  };

  document.getElementById('input-message').oninput = ()=>{
      var inputMessage = document.getElementById('input-message').value;
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(baseImage, 0, 0);
      ctx.fillText(inputMessage, textX, textY);
     
  }

  document.getElementById('download-image').onclick = ()=> {
    //アンカータグを作成
    var a = document.createElement('a');
    //canvasをJPEG変換し、そのBase64文字列をhrefへセット
    a.href = canvas.toDataURL();
    //ダウンロード時のファイル名を指定
    a.download = 'hello-canvas.png';
    //クリックイベントを発生させる
    a.click();
  }
};


  