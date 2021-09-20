export const eventsModif = (events) => {
  card = -1;
  return events.map(event => (
    {
      idCard: increment(),     
      id: event.id,
      images: sortImagesByWidth(event.images),
      //images: filterImagesByHeight(event.images),
      info: event.info,
      localDate: event.dates.start.localDate,
      timeZone: event.dates.timezone,
      name: event.name,
    })
  )
}

export const eventModif = (event) => (
  {
    id: event.id,
    images: sortImagesByWidth(event.images),
    //images: filterImagesByHeight(event.images),
    info: event.info,
    localDate: event.dates.start.localDate,
    localTime: (event.dates.start.localTime).slice(0, 5),
    timeZone: event.dates.timezone,
    city: event._embedded.venues[0].city.name,
    country: event._embedded.venues[0].country.name,
    name: event.name,
    places: event._embedded.venues[0].name,
    priceSt: findPricesBySt(event.priceRanges),
    priceVip: findPricesByVip(event.priceRanges),
    url: event.url
   }
)

export function sortImagesByWidth (images) {
  if (!images) {return}
  const sortByWidth = (imgA, imgB) => (imgB.width) - (imgA.width);
  return images.sort(sortByWidth);
  }

function findPricesBySt (prices) {
  if (!prices) {return}
  return prices.find(price => price.type === "standard");
}  

function findPricesByVip (prices) {
  if (!prices) {return}
  return prices.find(price => price.type === "vip");
}  

function filterImagesByHeight (images) {
  if (!images) {return}
  return images.filter(image => image.height === 639);
}  

let card;
const increment = () => card += 1;  