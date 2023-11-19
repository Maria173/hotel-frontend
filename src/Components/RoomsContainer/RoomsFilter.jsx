import React, {useState} from "react";
import DatePicker from "react-datepicker";
import { registerLocale } from  "react-datepicker";
import ru from 'date-fns/locale/ru';
import "react-datepicker/dist/react-datepicker.css";
import {formatDate} from '../../Helpers';
// import context
import { RoomContext } from "../../Context/Context";

// import components
import Title from "../Title/Title";

export default function RoomFilter({ rooms, setFilters, filters }) {
  registerLocale('ru', ru)
  // const context = useContext(RoomContext);
  // const {
  //   handleChange,
  //   type,
  //   capacity,
  //   price,
  //   minPrice,
  //   maxPrice,
  //   minSize,
  //   maxSize,
  //   breakfast,
  //   pets,
  // } = context;

  const [price, setPrice] = useState(filters.price);
  const [type, setType] = useState(filters.type);
  const [breakfast, setBreakfast] = useState(filters.breakfast);
  const [pets, setPets] = useState(filters.pets);
  const [dateIn, setDateIn] = useState();
  const [dateOut, setDateOut] = useState();
  const [error, setError] = useState('');

  const handleFilter = (e) => {
    e.preventDefault();
    
    if (!dateIn || !dateOut || dateOut <= dateIn) {
      setError('Выберите корректные даты')
    } else {
    setError('');
    setFilters({
      price,
      type,
      breakfast,
      pets,
      dateIn: formatDate(dateIn),
      dateOut: formatDate(dateOut)
    })
    localStorage.setItem('dateIn', formatDate(dateIn));
    localStorage.setItem('dateOut', formatDate(dateOut));
    }
  }

  const types = ["Все", 'Стандарт', 'Люкс', 'Премиум'].map((item, index) => {
    return (
      <option value={item} key={index}>
        {item}
      </option>
    );
  });

  return (
    <section className="filter-container">
      <Title title="Подбор номеров" />

      <form className="filter-form" style={{marginTop: '2rem'}}>
        <div className="form-group">
        <label>Дата заезда</label>
          <DatePicker locale="ru" className="form-control" selected={dateIn} onChange={(date) => setDateIn(date)} />
        </div>
        <div className="form-group">
        <label>Дата выезда</label>
          <DatePicker locale="ru" className="form-control" selected={dateOut} onChange={(date) => setDateOut(date)} />
        </div>

      {/* room price start */}
        <div className="form-group">
          <label htmlFor="price">Цена {price}₽</label>

          <input
            type="range"
            name="price"
            min={5000}
            max={20000}
            id="price"
            value={price}
            onChange={e => setPrice(e.target.value)}
            className="form-control"
          />
        </div>
        {/* room price end */}

        {/* select type start */}
        <div className="form-group">
          <label htmlFor="type">Тип</label>
          <select
            name="type"
            id="type"
            value={type}
            className="form-control"
            onChange={e => setType(e.target.value)}
          >
            {/* <option value="single">single</option> */}
            {types}
          </select>
        </div>
        {/* select type end */}

        {/* extras start */}
        <div className="form-group">
          {/* breakfast checked */}
          <div className="single-extra" style={{marginBottom: '10px'}}>
            <input
              type="checkbox"
              name="breakfast"
              id="breakfast"
              checked={breakfast}
              onChange={e => setBreakfast(e.target.checked)}
            />
            <label htmlFor="breakfast">Завтрак</label>
          </div>

          {/* pets checked */}
          <div className="single-extra">
            <input
              type="checkbox"
              name="pets"
              id="pets"
              checked={pets}
              onChange={e => setPets(e.target.checked)}
            />
            <label htmlFor="pets">Животные</label>
          </div>
        </div>
        {/* extras end */}

        <button type="submit" className="button" onClick={handleFilter}>Применить</button>
      </form>
      {error && <p className="error-container">{error}</p>}
    </section>
  );
}
