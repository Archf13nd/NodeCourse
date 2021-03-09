// const fs = require('fs');

const { query } = require('express');
const Tour = require('./../models/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// // );

// exports.checkID = (req, res, next, val) => {
//   console.log(`Tour ID: ${val} Haha`);
//   if (+req.params.id > tours.length || +req.params.id < 1) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'No no no',
//     });
//   }
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   console.log('Checking body. . .');
//   const { name, price } = req.body;
//   if (!name || !price) {
//     return res.status(400).json({
//       status: 'Fail',
//       message: 'No name or price property with body',
//     });
//   }
//   next();
// };

exports.getAllTours = async (req, res) => {
  try {
    // BUILD QUERY

    // 1A: FILTERING
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B // ADVANCED FILTERING
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    console.log(JSON.parse(queryStr));

    let query = Tour.find(JSON.parse(queryStr));

    // 2 SORTING
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query.sort(sortBy);
      // sort('price)
    } else {
      query = query.sort('-createdAt');
    }

    // 3 Field Limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // {difficulty: 'easy', duration: {$gte: 5}}

    // const tours = await Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');

    const tours = await query;

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failhahahaha',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      results: 1,
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failhahahaha',
      message: err,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid Request',
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid Request',
    });
  }
};
