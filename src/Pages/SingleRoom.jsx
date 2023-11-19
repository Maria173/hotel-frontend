import React, { Component, useState, useEffect } from "react";

import { Link, useParams } from "react-router-dom";
import {formatLiteralDate} from '../Helpers';

// import assets
import defaultBcg from "../assets/img/jpeg/room-1.jpeg";

// import components
import Banner from "../Components/Banner/Banner";
import { RoomContext } from "../Context/Context";
import StyledHero from "../Components/StyledHero/StyledHero";

export default function SingleRoom(props) {
  const { slug } = useParams();
  const [room, setRoom] = useState(props.mockRoom ? props.mockRoom : []);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [fio, setFIO] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3010/rooms/${slug}`)
      .then((res) => res.json())
      .then((result) => setRoom(result));
  }, [slug]);

    if (!room?.[0]) {
      return (
        <div className="error">
          <h3>Номер не найден!</h3>
          <Link to="/rooms" className="btn-primary">
            К номерам
          </Link>
        </div>
      );
    }

    const {
      name,
      description,
      price,
      image,
      pets,
      breakfast
    } = room?.[0];

    const dateIn = localStorage.getItem('dateIn');
    const dateOut = localStorage.getItem('dateOut');

    const handleBook = (e) => {
      e.preventDefault();
      if (!fio || !phone || !email) {
        setError('Заполните все поля');
      } else {
        setError('');

        const data = {
          roomId: Number(slug),
          dateIn: dateIn,
          dateOut: dateOut,
          fio: fio,
          phone: phone,
          email: email
        };
        console.log(data);
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        };
        fetch('http://localhost:3010/book', requestOptions)
          .then((result) => {setSuccess(true); console.log('Success: ', result); localStorage.removeItem('dateIn'); localStorage.removeItem('dateOut');})
          .catch((error) => {setError(error); console.log('Error: ', error)});
      }
    }

    return (
      <>
        <StyledHero img={image}>
          <Banner title={`${name}`}>
            <Link to="/rooms" className="btn-primary">
              К номерам
            </Link>
          </Banner>
        </StyledHero>

          <div className="single-room-info">
            <article className="desc">
              <h3>Описание:</h3>
              <p>{description}</p>
            </article>

            <article className="info">
              <h3>Выбранные фильтры:</h3>
              <h6>Цена: ${price}</h6>
              <h6>Животные {pets ? 'разрешены' : "не разрешены"}</h6>
              <h6>Завтрак {breakfast ? "включён" : 'не включён'}</h6>
            </article>

            {dateIn && dateOut &&
              <article className="info" style={{padding: 0}}>
                <h3>Бронирование:</h3>
                <h6>Дата заезда: {formatLiteralDate(dateIn)}</h6>
                <h6>Дата выезда: {formatLiteralDate(dateOut)}</h6>
                {!isBookOpen && <button onClick={() => setIsBookOpen(true)} className="button" style={{padding: '10px 20px'}}>Забронировать</button>}
              </article>}

              {isBookOpen && !success && <form className="info">
                <label>ФИО</label>
                <input value={fio} onChange={e => setFIO(e.target.value)} style={{marginBottom:"20px", marginTop:"10px"}} className="form-control" type="text"/>
                <label>Телефон</label>
                <input value={phone} onChange={e => setPhone(e.target.value)} style={{marginBottom:"20px", marginTop:"10px"}} className="form-control" type="text"/>
                <label>Email</label>
                <input value={email} onChange={e => setEmail(e.target.value)} style={{marginBottom:"20px", marginTop:"10px"}} className="form-control" type="text"/>
                <div style={{display: 'flex', gap: '20px', alignItems: 'baseline'}}><button onClick={handleBook} type="submit" className="button" style={{padding: '10px 20px'}}>Забронировать</button>
                {error && <p style={{color: 'red'}}>{error}</p>}</div>
              </form>}
              {success && <article className="info"><h3>Бронирование подтверждено! В ближайшее время мы свяжемся с вами!</h3></article>}
          </div>
      </>
    );
  }
