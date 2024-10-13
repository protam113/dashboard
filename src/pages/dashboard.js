import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Context } from '..';
import { Navigate } from 'react-router-dom';

// icon
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdDelete } from "react-icons/md"; // Import icon Delete

// image
import Admin from "../assets/img/logo.png";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [managerCount, setManagerCount] = useState(0);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/appointment/getall",
          { withCredentials: true }
        );
        setAppointments(data.appointments);
      } catch (error) {
        setAppointments([]);
      }
    };

    const fetchManagers = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/user/managers",
          { withCredentials: true }
        );
        setManagerCount(data.managers.length);
      } catch (error) {
        setManagerCount(0);
      }
    };

    fetchAppointments();
    fetchManagers();
  }, []);

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/appointment/update/${appointmentId}`,
        { status },
        { withCredentials: true }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDeleteAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/appointment/delete/${appointmentId}`,
        { withCredentials: true }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment._id !== appointmentId)
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const { isAuthenticated, admin } = useContext(Context);
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <section className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div className="bg-red-300 flex items-center p-4 rounded-lg shadow-md">
            <img src={Admin} alt="adminIMG" className="w-16 h-16 rounded-full mr-4" />
            <div className="content">
              <div>
                <p className="text-gray-600">Hello ,</p>
                <h5 className="text-xl font-semibold">
                  {admin && `${admin.username}`}
                </h5>
              </div>
              <p className="text-gray-600">
                Chúng tôi luôn lấy khách hàng làm trọng tâm và phục vụ khách hàng là yếu tố mang đến sự thành công.
              </p>
            </div>
          </div>
          <div className="secondBox bg-white p-4 rounded-lg shadow-md flex flex-col justify-center items-center">
            <p className="text-gray-600">Total Appointments</p>
            <h3 className="text-2xl font-bold">1500</h3>
          </div>
          <div className="thirdBox bg-green-300 p-4 rounded-lg shadow-md flex flex-col justify-center items-center">
            <p className="text-gray-600">Registered Manager</p>
            <h3 className="text-2xl font-bold">{managerCount}</h3>
          </div>
        </div>
        <div className="banner bg-white p-4 rounded-lg shadow-md">
          <h5 className="text-xl font-semibold mb-4">Appointments</h5>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Name</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Message</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th> 
              </tr>
            </thead>
            <tbody>
              {appointments && appointments.length > 0
                ? appointments.map((appointment) => (
                    <tr key={appointment._id} className="text-center">
                      <td className="border p-2">{appointment.name}</td>
                      <td className="border p-2">{appointment.appointment_date.substring(0, 16)}</td>
                      <td className="border p-2">{appointment.phone}</td>
                      <td className="border p-2">{appointment.title}</td>
                      <td className="border p-2">
                        <select
                          className={`p-1 rounded ${
                            appointment.status === "Pending"
                              ? "bg-yellow-400"
                              : appointment.status === "Accepted"
                              ? "bg-green-400"
                              : "bg-red-400"
                          }`}
                          value={appointment.status}
                          onChange={(e) =>
                            handleUpdateStatus(appointment._id, e.target.value)
                          }
                        >
                          <option value="Pending" className="value-pending">
                            Pending
                          </option>
                          <option value="Accepted" className="value-accepted">
                            Accepted
                          </option>
                          <option value="Rejected" className="value-rejected">
                            Rejected
                          </option>
                        </select>
                      </td>
                      <td className="border p-2 flex justify-center items-center">
                        {appointment.hasVisited === true ? (
                          <GoCheckCircleFill className="text-green-500 mx-1" />
                        ) : (
                          <AiFillCloseCircle className="text-red-500 mx-1" />
                        )}
                        <MdDelete 
                          className="text-red-500 cursor-pointer mx-1"
                          onClick={() => handleDeleteAppointment(appointment._id)}
                        />
                      </td>
                    </tr>
                  ))
                : <tr><td colSpan="6" className="text-center p-4">No Appointments Found!</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
