import { useState, useEffect } from "react";

export default function Main() {
  const [meme, setMeme] = useState({
    topText: "One does not simply",
    bottomText: "Walk into Mordor",
    imageUrl: "http://i.imgflip.com/1bij.jpg",
  });
  const [memesImg, setMemesImg] = useState([]);

  function handleChange(event) {
    const { value, name } = event.currentTarget;
    setMeme((prevMeme) => ({ ...prevMeme, [name]: value }));
  }

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => data.data.memes.map((memes) => memes.url))
      .then((urls) => setMemesImg(urls));
  }, []);

  // can setMemesImg(data.data.memes)


  function toggleChangeMeme() {
   const randomNum = Math.floor(Math.random() * memesImg.length)
   console.log(randomNum)
     setMeme((prevMeme) => ({
        ...prevMeme,
        imageUrl: memesImg[randomNum],
      }));
  }

  return (
    <main>
      <div className="form">
        <label>
          Top Text
          <input
            type="text"
            placeholder="One does not simply"
            name="topText"
            onChange={handleChange}
            value={meme.topText}
          />
        </label>

        <label>
          Bottom Text
          <input
            type="text"
            placeholder="Walk into Mordor"
            name="bottomText"
            onChange={handleChange}
            value={meme.bottomText}
          />
        </label>
        <button onClick={toggleChangeMeme}>Get a new meme image 🖼</button>
      </div>
      <div className="meme">
        <img src={meme.imageUrl} />
        <span className="top">{meme.topText}</span>
        <span className="bottom">{meme.bottomText}</span>
      </div>
    </main>
  );
}
