import React, {useState} from 'react'
import { Avatar, Button, Divider, Drawer, Form, Input, Menu, Space, Upload } from "antd"
import { BiHomeAlt } from "react-icons/bi"
import { FcIdea } from "react-icons/fc"
import { FcDepartment } from "react-icons/fc"
import { GrGroup } from "react-icons/gr"
import Link from 'next/link'
import { BsPlus} from "react-icons/bs"


export default function Layout({ children }) {
  
  const items =[
    {
      key : 1,
      label: <Link href={"/"}>Home</Link>,
      icon:<BiHomeAlt/>
    },
    {
      key : 2,
      label: <Link href={"/idea"}>idea</Link>,
      icon:<FcIdea/>,
      children: [
        {
          key : 2.1,
          label: <Link href={"/idea"}>Submit your idea</Link>,
          icon:<FcIdea/>
        },
        {
          key : 2.2,
          label: <Link href={"/idea"}>your idea</Link>,
          icon:<></>
        },
      ]
    },
    {
      key : 3,
      label: <Link href={"/"}>Department</Link>,
      icon:<FcDepartment/>,
      children: [
        {
          key : 3.1,
          label: <Link href={"/department"}>Department A</Link>,
          icon:<></>
        },
        {
          key : 3.2,
          label: <Link href={"/department"}>Department B</Link>,
          icon:<></>
        },
        {
          key : 3.3,
          label: <Link href={"/department"}>Department C</Link>,
          icon:<></>
        },
      ]
    },
    {
      key : 4,
      label: <Link href={"/privilege"}>Privilege</Link>,
      icon:<GrGroup/>,
      children: [
        {
          key : 3.1,
          label: <Link href={"/admin"}>Admin</Link>,
          icon:<></>
        },
        {
          key : 3.2,
          label: <Link href={"/department"}>Head/Manager </Link>,
          icon:<></>
        },
        {
          key : 3.3,
          label: <Link href={"/department"}>Coordinator </Link>,
          icon:<></>
        },
      ]
    },
  ]

    const [open, setOpen] = useState(false);
  
    const openDrawer = () => {
      setOpen(true);
    };

    const onClose = () => {
      setOpen(false);
    };
    
  const sampleActivities =[
    "You just like a post",
    "You just dislike a post",
    "You just comment a post",
    "You just dislike a post",
    "You just comment a post",
    "You just like a post",
    "You just like a post",
    "You just like a post",

  ]


  return (
    <div>
        {/* Navbar */}
        <header style={{maxWidth:1580, margin:" 0 auto", display: 'flex',justifyContent:"space-between"}}>
          <section style={{display:'flex'}}>       
            <img src='https://ap.greenwich.edu.vn/FGW_logo_d.jpg' style={{height: 50}} />
            {/* Menu */}
            <Menu
              mode="horizontal"
              items={ items }
            />
          </section>

          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" style={{cursor:'pointer'}} onClick = {openDrawer}/>

          <Drawer title="" placement="right" onClose={onClose} open={open}
            extra={
              <Space>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onClose} type="primary">Log out</Button>
                <Button onClick={onClose} danger>Changes</Button>
              </Space>
              }
            >
            <Form labelCol={{span: 6}} wrapperCol={{span: 18}}> 
                <Form.Item label="Email" colon ={false}>
                  <Input disabled/>
                </Form.Item>              
                <Form.Item label="Department"colon ={false}>
                  <Input disabled/>
                </Form.Item>
                <Form.Item label="UserName"colon ={false}>
                  <Input/>
                </Form.Item>
                <Form.Item label="Avatar"colon ={false}>
                <Upload action="/upload.do" listType="picture-card">
                    <div style={{display:'flex'}}>
                      <BsPlus/>
                      <div>Upload</div>
                    </div>
                  </Upload>
                </Form.Item>
            </Form>
            <Divider><span style={{ fontSize:18}}>Activities</span></Divider>
            {
              sampleActivities.map(i => {
                return <div key={i}>
                  <a>{i}</a>
                  <Divider/>
                </div>
              })
            }


          </Drawer>

        </header>

        {children}
    </div>
  )
}
