import style from './Card.module.css'

/* eslint-disable react/prop-types */
export const Card = (props) => {
  const item = props.item;
  return (
    <article className={style.card}>
      <div className={style.image}>
        <img src={item.image} alt={item.name}></img>
      </div>
      <div className={style.content}>
        <div className={style.section}>
          <h2>{item.name}</h2>
          <span className={style.status}>
            <span
              className={style.status_icon}
              style={
                item.status == "Alive"
                  ? { background: "rgb(85, 204, 68)" }
                  : item.status == "Dead"
                    ? { background: "rgb(214, 61, 46)" }
                    : { background: "rgb(158, 158, 158)" }
              }></span>
            {item.status}
            {" - "}
            {item.species}
          </span>
        </div>
        <div className={style.section}>
          <span className={style.text_gray}>Último local conhecido:</span>
          <a>{item.location.name}</a>
        </div>
        <div className={style.section}>
          <span className={style.text_gray}>Visto pela primeira vez em:</span>
          <a>{item.origin.name}</a>
        </div>
      </div>
    </article>
  )
}