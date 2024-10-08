import { PAGE_SIZE } from "../utils/constants";
import { differenceDays, getToday } from "../utils/helpers";
import supabase from "./supabase";

export async function getBookingData({ filter, sortBy, page }) {
  let query = supabase
    .from("bookings")
    .select("*, cabins(name), guests(fullName,email)", { count: "exact" });

  if (filter) {
    // filter.map(filt=>{
    //   query = query[filt.method](filt.field, filt.value);
    // })

    query = query[filter.method || "eq"](filter.field, filter.value);
  }

  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  }

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }

  return { data, count };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  console.log(data);

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

export async function createBookings({ guestData, bookingData }) {
  const { data: guest, error: guestError } = await supabase
    .from("guests")
    .insert([guestData])
    .select()
    .single();

  if (guestError) throw new Error(guestError.message);

  const numNights = differenceDays(bookingData.startDate, bookingData.endDate);

  const startDate = `${bookingData.startDate}T00:00:00`;
  const endDate = `${bookingData.endDate}T00:00:00`;

  const { data: cabinsPrice } = await supabase
    .from("cabins")
    .select("id, regularPrice, discount")
    .eq("name", bookingData.cabinName)
    .single();

  const { regularPrice, discount, id: cabinId } = cabinsPrice;

  const cabinPrice = bookingData.numGuests * (regularPrice - discount);
  console.log(cabinPrice);

  let extrasPrice = 0;
  if (bookingData.hasBreakfast) {
    const { data, error: settingsError } = await supabase
      .from("settings")
      .select("breakFastPrice")
      .single();
    if (settingsError) throw new Error(settingsError.message);

    extrasPrice = data.breakFastPrice;
  }

  const totalPrice = cabinPrice + extrasPrice;

  const finalBooking = {
    startDate,
    endDate,
    numNights,
    numGuests: bookingData.numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    status: bookingData.status,
    hasBreakfast: bookingData.hasBreakfast,
    isPaid: bookingData.isPaid,
    cabinId,
    guestId: guest.id,
  };

  const { data: booking, error: bookingError } = await supabase
    .from("bookings")
    .insert([finalBooking])
    .select();

  if (bookingError) throw new Error(bookingError.message);

  return booking[0];
}

export async function guestBasedCabins(guestsCount) {
  const { data, error } = await supabase
    .from("cabins")
    .select("name, maxCapacity")
    .gte("maxCapacity", guestsCount);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
