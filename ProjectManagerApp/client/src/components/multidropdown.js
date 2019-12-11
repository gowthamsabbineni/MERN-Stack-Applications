import React from 'react';
import Select from 'react-select';

const data=[
    {value:1,label:"One"},
    {value:2,label:"Two"},
    {value:3,label:"Three"}
]
const onChangeDD =(e)=>{
  console.log(e);
}
const multidropdown= (e) => (
    <Select onChange={(e)=>{onChangeDD(e)}}
      closeMenuOnSelect={false}
      defaultValue={[data[0], data[1]]}
      isMulti
      options={data}
    />
  )
export default multidropdown;