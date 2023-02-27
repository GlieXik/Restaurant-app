const statusOrder = (stan) => {
  switch (stan) {
    case 0:
      return "Очікується";

    case 1:
      return "Готується";
    case 2:
      return "Готово";
    case 3:
      return "Оплачено";
    default:
      break;
  }
};
export default statusOrder;
