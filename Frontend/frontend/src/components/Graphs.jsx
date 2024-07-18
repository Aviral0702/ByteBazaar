import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const calculateMonthlyExpenditure = (products) => {
  const monthlyExpenditure = {};

  products.forEach(product => {
    const date = new Date(product.boughtAt);
    const month = date.getMonth() + 1; // JavaScript months are 0-based
    const year = date.getFullYear();
    const key = `${year}-${month < 10 ? '0' : ''}${month}`;

    if (!monthlyExpenditure[key]) {
      monthlyExpenditure[key] = 0;
    }

    monthlyExpenditure[key] += product.quantity * product.discountPrice;
  });

  return monthlyExpenditure;
};

const calculateYearlyExpenditure = (products) => {
  const yearlyExpenditure = {};

  products.forEach(product => {
    const year = new Date(product.boughtAt).getFullYear();

    if (!yearlyExpenditure[year]) {
      yearlyExpenditure[year] = 0;
    }

    yearlyExpenditure[year] += product.quantity * product.discountPrice;
  });

  return yearlyExpenditure;
};

const generateRandomColor = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgba(${r},${g},${b},1)`;
};

const Graphs = () => {
  const [products, setProducts] = useState([]);
  const [monthlyData, setMonthlyData] = useState({});
  const [yearlyData, setYearlyData] = useState({});

  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        const userIdResponse = await fetch('/api/auth/signedInUserId');
        const userIdData = await userIdResponse.json();
        const { userId } = userIdData;

        const response = await fetch(`/api/cart/getPurchasedProducts/${userId}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchUserProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      setMonthlyData(calculateMonthlyExpenditure(products));
      setYearlyData(calculateYearlyExpenditure(products));
    }
  }, [products]);

  const monthlyLabels = Object.keys(monthlyData);
  const monthlyValues = Object.values(monthlyData);
  const monthlyColors = monthlyLabels.map(() => generateRandomColor());

  const yearlyLabels = Object.keys(yearlyData);
  const yearlyValues = Object.values(yearlyData);
  const yearlyColors = yearlyLabels.map(() => generateRandomColor());

  const monthlyChartData = {
    labels: monthlyLabels,
    datasets: [
      {
        label: 'Monthly Spending',
        data: monthlyValues,
        borderColor: monthlyColors,
        backgroundColor: monthlyColors.map(color => color.replace('1)', '0.2)')),
        borderWidth: 1,
      },
    ],
  };

  const yearlyChartData = {
    labels: yearlyLabels.reverse(), // Reverse the order of labels
    datasets: [
      {
        label: 'Yearly Spending',
        data: yearlyValues.reverse(), // Reverse the order of data
        borderColor: yearlyColors,
        backgroundColor: yearlyColors.map(color => color.replace('1)', '0.2)')),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Spending Graphs</h1>
      <div className="flex space-x-8">
        <div className="w-1/2">
          <h2 className="text-xl font-semibold mb-2">Monthly Spending</h2>
          <Line data={monthlyChartData} />
        </div>
        <div className="w-1/2">
          <h2 className="text-xl font-semibold mb-2">Yearly Spending</h2>
          <Line data={yearlyChartData} />
        </div>
      </div>
    </div>
  );
};

export default Graphs;
