
window.onload = ()=>{

  // canvas準備
  const canvas = document.querySelector('#board');  //getElementById()等でも可。オブジェクトが取れれば良い。
  const ctx = canvas.getContext('2d');
  ctx.textAlign = 'center';
  
  // 画像データ
  const imageList = [
    {
      fileName: 'base_1.png',
      textX: 30,
      textY: 200,
      font:'30px serif',
    },
    {
      fileName: 'base_2.jpg',
      textX: 100,
      textY: 260,
      font: '40px serif',
    },
  ]

  
  // 背景画像
  const baseImage = new Image();
  let imageIndex = 0;
  baseImage.src = imageList[imageIndex].fileName;  // 画像のURLを指定
  // 文字列表示座標
  let textX = imageList[imageIndex].textX ;
  let textY = imageList[imageIndex].textY;
  
  let imageText = document.getElementById('input-message').value || 'メッセージを入力してね！';
  
  baseImage.onload = () => {
    canvas.height  = baseImage.naturalHeight;
    canvas.width  = baseImage.naturalWidth;
    ctx.drawImage(baseImage, 0, 0);
    ctx.font = imageList[imageIndex].font;
    // 文字列表示座標
    textX = imageList[imageIndex].textX ;
    textY = imageList[imageIndex].textY;
    ctx.fillText(imageText, textX, textY);
  };

  document.getElementById('input-message').oninput = ()=>{
    imageText = document.getElementById('input-message').value;
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(baseImage, 0, 0);
    ctx.fillText(imageText, textX, textY); 
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

  const imageSelectElement = document.getElementById('baseImageOptions')
  imageSelectElement.onchange = ()=> {
    imageIndex = imageSelectElement.value
    baseImage.src = imageList[imageIndex].fileName;  // 画像のURLを指定
  }
};


  