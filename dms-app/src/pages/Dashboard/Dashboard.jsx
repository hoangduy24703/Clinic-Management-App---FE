import styled from "styled-components"
import SliderCategory from "../../components/Slider/SliderCategory"
import { Bar } from 'react-chartjs-2';

export default function Dashboard() {
  const chartData = {
    labels: ['Data Chart'],
    datasets: [
      {
        label: 'Patients',
        backgroundColor: '#3498db',
        borderColor: '#2980b9',
        borderWidth: 1,
        hoverBackgroundColor: '#3498db',
        hoverBorderColor: '#2980b9',
        data: [10],
      },
      {
        label: 'Staffs and Doctors',
        backgroundColor: '#2ecc71',
        borderColor: '#27ae60',
        borderWidth: 1,
        hoverBackgroundColor: '#2ecc71',
        hoverBorderColor: '#27ae60',
        data: [10], // Replace with actual staff data
      },
    ]
  }

  return (<DashboardWrapper>
    <SliderCategory />
    <h1>WELCOME TO DMS</h1>

    <div className="data-card">
      <h3>Total Patients</h3>
      <Bar
          data={chartData}
          options={{
            scales: {
              x: {
                stacked: true,
              },
              y: {
                stacked: true,
                beginAtZero: true,
              },
            },
          }}
        />
    </div>
  </DashboardWrapper>)
}

const DashboardWrapper = styled.div`
  text-align: center;
  
  h1 {
    margin-top: 5vh;
    font-weight: 700;
    font-size: 100px;
  }
`