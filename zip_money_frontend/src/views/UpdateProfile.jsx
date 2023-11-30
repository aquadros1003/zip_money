import React, { useEffect, useState } from "react";
import HeaderNav from "../components/HeaderNav";
import ME from "../api/queries/Me";
import { useQuery } from "@apollo/client";
import {
  Row,
  Col,
  Button,
  Card,
  Avatar,
  Dropdown,
  Table,
  Menu,
  Tag,
} from "antd";
import {
  apexLineChartDefaultOption,
  COLOR_2,
} from "../constants/ChartConstant";
import {
  UserAddOutlined,
  FileExcelOutlined,
  PrinterOutlined,
  PlusOutlined,
  EllipsisOutlined,
  StopOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import GET_TRANSACTIONS from "../api/queries/GetTransactions";
import GET_EXPENSES from "../api/queries/GetMonthlyExpenses";
import GET_MONTHLY_CHART_DATA from "../api/queries/GetMonthlyChartData";
import GET_PINNED_BUDGET from "../api/queries/GetPinnedBudget";
import { Spin } from "antd";
import UpdateProfileForm from "../components/UpdateProfileForm";

const { Meta } = Card;

const UpdateProfile = () => {
  return (
    <div>
      <UpdateProfileForm />
    </div>
  );
}


export default UpdateProfile;