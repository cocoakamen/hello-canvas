window.onload = () => {
  // canvas準備
  const canvas = document.querySelector("#board"); //getElementById()等でも可。オブジェクトが取れれば良い。
  const ctx = canvas.getContext("2d");
  ctx.textAlign = "center";

  // 画像データ
  const imageList = [
    {
      fileName: "base_1.png",
      textX: 30,
      textY: 150,
      textColor: '#2f4f4f',
      font: "30px serif",
      charsPerLine: 15,
      lineHeight: 40,
    },
    {
      fileName: "base_2.jpg",
      textX: 100,
      textY: 260,
      textColor: '#708090',
      font: "40px serif",
      charsPerLine: 15,
      lineHeight: 45,
    },
  ];

  // 背景画像
  const baseImage = new Image();
  let imageIndex = 0;
  baseImage.src = imageList[imageIndex].fileName; // 画像のURLを指定

  let imageText =
    document.getElementById("input-message").value ||
    "メッセージを入力してね！";

  // Canvasに文字列を表示する用の設定
  let textConfig = {};
  let setTextConfig = function (index) {
    textConfig = {
      x: imageList[index].textX, // 文字列表示を開始するX座標
      y: imageList[index].textY, // 文字列表示を開始するY座標
      color: imageList[index].textColor, // 文字列の色
      font: imageList[index].font,
      charsPerLine: imageList[index].charsPerLine, //１行当たりの文字数
      lineHeight: imageList[index].lineHeight, // 改行するときにずらずY座標
    };
  };

  // テキスト表示の初期設定
  setTextConfig(imageIndex);

  // テキスト描画
  const updateText = function (text) {
    let imageTextRows = [];
    for (let i = 0; i < Math.ceil(text.length / textConfig.charsPerLine); i++) {
      imageTextRows.push(
        text.substr(textConfig.charsPerLine * i, textConfig.charsPerLine)
      );
    }

    // 設定文字数ごとの配列をY軸座標をずらしながら描画
    for (let i = 0; i < imageTextRows.length; i++) {
      ctx.fillStyle = textConfig.color;
      ctx.fillText(
        imageTextRows[i],
        textConfig.x,
        textConfig.y + textConfig.lineHeight * i
      );
    }
  };
  // 背景画像ロード時の処理
  baseImage.onload = () => {
    canvas.height = baseImage.naturalHeight;
    canvas.width = baseImage.naturalWidth;
    ctx.drawImage(baseImage, 0, 0);
    ctx.font = textConfig.font;
    // テキストボックスに入力された文字列を画像ごとに設定された文字数ごとに1行分ずつの配列に分ける
    updateText(document.getElementById("input-message").value);
  };

  document.getElementById("input-message").oninput = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(baseImage, 0, 0);

    // テキストボックスに入力された文字列を画像ごとに設定された文字数ごとに1行分ずつの配列に分ける
    updateText(document.getElementById("input-message").value);
  };

  document.getElementById("download-image").onclick = () => {
    //アンカータグを作成
    var a = document.createElement("a");
    //canvasをJPEG変換し、そのBase64文字列をhrefへセット
    a.href = canvas.toDataURL();
    //ダウンロード時のファイル名を指定
    a.download = "hello-canvas.png";
    //クリックイベントを発生させる
    a.click();
  };

  const imageSelectElement = document.getElementById("baseImageOptions");
  imageSelectElement.onchange = () => {
    imageIndex = imageSelectElement.value;
    setTextConfig(imageIndex);
    baseImage.src = imageList[imageIndex].fileName; // 画像のURLを指定
  };
};
