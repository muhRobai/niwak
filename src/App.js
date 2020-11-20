import React, {Component} from 'react';
import qs from 'qs';
import aes256 from 'aes256';
import data from './recipients.json';
import './App.css';
import Slider from 'react-slick';

const secretKey = process.env.REACT_APP_SECRET_KEY;
class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isValidRecipient: false,
      recipientName: '',
      play: false,
      pause: true,
    }
    this.audio = new Audio(require('./assets/lagu.mp3'))
    this.audio.addEventListener('ended', function () {
      this.currentTime = 0;
      this.play();
    }, false);
  }

  play = () => {
    this.setState({ 
      play: true, 
      pause: false 
    })
    this.audio.play();
  }

  pause = () => {
    this.setState({ 
      play: false, 
      pause: true 
    })
    this.audio.pause();
  }

  componentDidMount() {
    let query = qs.parse(window.location.search.replace('?', ''));
		if (!query.recipient) {
			return;
		}
    if (data.recipients[query.recipient.substr(0, 6)]) {
      const key = secretKey + query.recipient;
      console.log(key);
      const cipher = aes256.createCipher(key);
      // Recipient
      const encryptedRecipient =
        data.recipients[query.recipient.substr(0, 6).toUpperCase()].recipient
      console.log(encryptedRecipient);
      const decryptedRecipient = cipher.decrypt(encryptedRecipient);
      // Payload
      const encryptedPayload =
        data.recipients[query.recipient.substr(0, 6).toUpperCase()].payload
      const decryptedPayload = cipher.decrypt(encryptedPayload);
			var payload;
      try {
        payload = JSON.parse(decryptedPayload)
      } catch(e) {
        return;
      }
			payload.recipientName = decryptedRecipient;
			payload.isValidRecipient = true;
      this.setState(payload);
    }
  }
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 2500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true
    };
    const images = [
      { src: require("./assets/carousel-1.jpg") },
      { src: require("./assets/carousel-2.jpg") },
      { src: require("./assets/carousel-3.jpg") },
    ];
    
    return !this.state.isValidRecipient ? (
      <div
        style={{
          margin: '0 auto',
          marginTop: '100px',
          width: '100%',
          textAlign: 'center',
        }}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.youtube.com/watch?v=Zlv1rdcpS9M"
          style={{width: '100%'}}>
          <img
            alt="marry_you"
            src="https://emos.plurk.com/1703a6090e1691631ea51377123f3bed_w48_h48.gif"
          />
        </a>
      </div>
    ) : (
      <div className="App">
        <div className='btn-fly'>
          <img 
            className='btn-icon'
            src={!this.state.play ? 
              require('./assets/mic-outline.svg') : 
              require('./assets/mic-off-outline.svg')}
            onClick={() => {
              if (this.state.play) {
                this.pause()
              } else {
                this.play()
              }
            }}
          />
        </div>
        <div className="row" style={{marginTop: 12, padding: '10px'}}>
          <div
            // className="card col s12 l8 offset-l1 center"
            className='undangan'
            style={{textAlign: 'center', paddingTop: '-5px'}}>
            <p className="recipient">
              Yth Bapak/Ibu/Saudara/i
              <br />
              <span style={{fontWeight: 'bold'}} id="to-name">
                {this.state.recipientName} & Keluarga
              </span>
            </p>
          </div>
          <div className="col s12 l8 offset-l2" style={{textAlign: 'center'}}>
            <div className="name-wrapper">
              <div className='nganten'>
                <img className='gif' src={require('./assets/wedding.gif')}></img>
                <div className='nganten-item'>
                  <div id="wife">{this.state.wifeName}</div>
                  <div id="and"><img 
                      className='rings'
                      src={require("./assets/rings.svg")}
                    >
                    </img>
                  </div>
                  <div id="husband">{this.state.husbandName}</div>
                </div>
              </div>
          </div>
          </div>
          <div id="main-card" className="undangan">
            <div className="card-content">
              <div className="centered-text" style={{color: 'rgba(0,0,0,0.7)'}}>
                <p>
                  <i>Bismillahirrahmannirrahim</i>
                </p>
                <p>
                  <i>Assalamu'alaikum Warahmatullahi Wabarakatuh</i>
                </p>
                <br />
                <br />
                <p>Maha Suci Allah yang telah menciptakan</p>
                <p>mahluk-Nya berpasang-pasangan.</p>
                <p>Kami bermaksud menyelenggarakan</p>
                <p>akad dan resepsi pernikahan putra-putri kami:</p>
                <br />
                <br />
                  <img className='nganten-image' src={require('./assets/ilham3.jpg')} />
                <p className="full-name">{this.state.wifeFullName}</p>
                <p style={{fontSize: '16px'}}>
                  {this.state.wifeFullNameCaption}
                </p>
                <p style={{fontSize: '52px', margin: '20px'}}>&</p>
                  <img className='nganten-image' src={require('./assets/denna2.jpg')} />
                <p className="full-name">{this.state.husbandFullName}</p>
                <p style={{fontSize: '16px'}}>
                  {this.state.husbandFullNameCaption}
                </p>
                <br />
                <br />
                <p>yang insyaAllah akan dilaksanakan pada:</p>
                <br />
              </div>
              <div className="row time-info" style={{marginTop: '20px'}}>
                <div 
                  className="card-item"
                  style={{fontWeight: 'bold', fontFamily: 'EasyNovember'}}>
                  <div
                    className="col info s12 l4 centered-text card custom"
                    style={{color: 'rgba(0,0,0,0.7)', fontSize: '16px'}}>
                    <div><img 
                        src={require("./assets/wedding-rings.svg")}
                        className="icon-card"
                      >
                      </img>
                    </div>
                    <div>Akad</div>
                    <div>10.00 WIB</div>
                  </div>
                  <div className="col info s12 l4 centered-text card custom">
                  <div><img 
                        src={require("./assets/wedding-arch.svg")}
                        className="icon-card"
                      >
                      </img>
                    </div>
                    <div>{this.state.day},</div>
                    <div>{this.state.date}</div>
                  </div>
                  <div
                    className="col info s12 l4 centered-text card custom"
                    style={{color: 'rgba(0,0,0,0.7)', fontSize: '16px'}}>
                      <div><img 
                        src={require("./assets/wedding.svg")}
                        className="icon-card"
                      >
                      </img>
                    </div>
                      <div>Resepsi</div>
                      <div>11.00-14.00 WIB</div>
                  </div>
                </div>
              </div>
              <div className="row" style={{marginTop: '30px'}}>
                <div className="col s12 centered-text">
                  <br />
                  <p>bertempat di:</p>
                  <p>{this.state.address1}</p>
                  <p>{this.state.address2}</p>
                  <p>{this.state.address3}</p>
                  <p>{this.state.address4}</p>
                  <p>{this.state.address5}</p>
                  <div
                    className="centered-text"
                    style={{marginBottom: 50, marginTop: 15}}>
                    <button
                      className={'btn btn-primary'}
                      onClick={() => {
                        window.location = this.state.addressLocation;
                      }}>
                      Lihat peta
                    </button>
                  </div>
                  <div className='protocol'>
                      <div>
                      Untuk mematuhi himbauan pemerintah dalam pencegahan penyebaran Covid-19, maka diharapakan bapak/ibu/saudara/i tamu undangan untuk:
                      </div>
                      <br/>
                      <div className='icon-protocol'>
                        <div>
                          <img 
                            className="size"
                            src={require("./assets/mask.svg")}/>
                            <div className='text'>
                            Selalu memakai masker selama acara berlangsung
                            </div>
                        </div>
                        <div>
                          <img 
                            className="size"
                            src={require("./assets/hand-wash.svg")}/>
                            <div className='text'>
                            Mencuci tangan sebelum dan sesudah memasuki lokasi acara.
                            </div>
                        </div>
                        <div>
                          <img 
                            className="size"
                            src={require("./assets/distance.svg")}/>
                            <div className='text'>
                            Tidak berkerumun, dengan menjaga jarak satu sama lain +/- 2 meter
                            </div>
                        </div>
                        <div>
                          <img 
                            className="size"
                            src={require("./assets/no-handshake.svg")}/>
                            <div className='text'>
                            Tidak bersalaman, dapat menggantinya dengan salaman jarak jauh
                            </div>
                        </div>
                      </div>
                  </div>
                  <br/>
                  <br/>
                  <p>Merupakan suatu kehormatan & kebahagiaan bagi kami</p>
                  <p>apabila Bapak/Ibu/Saudara/i berkenan hadir</p>
                  <p>untuk memberikan doa restu kepada putra putri kami.</p>
                  <br />
                  <p>
                    <i>Wassalamu'alaikum Warahmatullahi Wabarakatuh</i>
                  </p>
                  <br/>
                  <p>Yang berbahagia,</p>
                </div>
                <div
                  className="col info s12 l4 centered-text"
                  style={{color: 'rgba(0,0,0,0.7)'}}>
                  <div>Keluarga Bapak {this.state.wifeFamily1}</div>
                  <div>dan Ibu {this.state.wifeFamily2}</div>
                </div>
                <div className="col info s12 l4 centered-text">-- & --</div>
                <div
                  className="col info s12 l4 centered-text"
                  style={{color: 'rgba(0,0,0,0.7)'}}>
                  <div>Keluarga Bapak {this.state.husbandFamily1}</div>
                  <div>dan Ibu {this.state.husbandFamily2}</div>
                </div>
              </div>
              <div className="centered-text">
                <img
                  className="separator"
                  alt={'separator'}
                  style={{height: '75px'}}
                  src={require('./assets/separator.png')}
                />
              </div>
            </div>
          </div>
          <div className="card carousel">
          <h5> Galeri</h5>
            <Slider {...settings}>
              {images.map((img)=> (
                <div>
                  <img src={img.src}
                    className='img-carousel'
                  ></img>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
