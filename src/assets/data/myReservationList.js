const MyReservationData = {
  listData: [
    {
      id: 1,
      reseration_date: '21/10/19',
      reservation_time: '9:00-18:00',
      floor_id: 2,
      seat_id: 15,
      room_id: '',
      status: 0, //예약완료
      created_at: '21.10.17',
    },
    {
      id: 2,
      reseration_date: '21/10/18',
      reservation_time: '9:00-16:00',
      floor_id: 3,
      seat_id: 29,
      room_id: '',
      status: 1, //사용중
      created_at: '21.10.17',
    },
    {
      id: 3,
      reseration_date: '21/10/14',
      reservation_time: '9:00-13:00',
      floor_id: 5,
      seat_id: 20,
      room_id: '',
      status: 2, //사용완료
      created_at: '21.10.13',
    },
  ],
};

export default MyReservationData;
