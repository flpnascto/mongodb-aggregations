db.trips.aggregate([
  {
    $addFields: {
      totalTime: { $subtract: ["$stopTime", "$startTime"] },
    },
  },
  {
    $group: {
      _id: "$usertype",
      avgTime: {
        $avg: {
          $sum: {
            $divide: ["$totalTime", 60 * 60 * 1000],
          },
        },
      },
    },
  },
  {
    $project: {
      tipo: "$id",
      duracaoMedia: { $round: ["$avgTime", 2] },
    },
  },
]);
