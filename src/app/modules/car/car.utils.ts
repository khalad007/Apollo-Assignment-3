const CalculateMoney = (data: any, endTime: string) => {
  console.log(data);

  const startDateTimeStr = `${data?.date}T${data?.startTime}:00.000Z`;
  const endDateTimeStr = `${
    new Date().toISOString().split('T')[0]
  }T${endTime}:00.000Z`;

  const formattedStartTime = new Date(startDateTimeStr);
  const formattedEndTime = new Date(endDateTimeStr);
  const differenceInHours =
    (formattedEndTime.getTime() - formattedStartTime.getTime()) /
    (1000 * 60 * 60);
    const Price = differenceInHours * data.car.pricePerHour
  return Price
};

export default CalculateMoney;
