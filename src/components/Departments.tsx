import React, {useState} from 'react'
import { TreeView, TreeItem } from '@mui/lab';
import {Box, Checkbox} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FormControlLabel from '@mui/material/FormControlLabel';

type Department = {
    department: string,
    sub_departments: string[],
    parent_checked?: boolean,
    sub_departments_checked?: boolean[],
}

const departmentList: Department[] = [
	{
  	"department": "customer_service",
  	"sub_departments": [
    	"support",
    	"customer_success"
  	]
	},
	{
  	"department": "design",
  	"sub_departments": [
    	"graphic_design",
    	"product_design",
    	"web_design"
  	]
	}
  ]


const Departments = () => {

  const [departments, setDepartments] = useState<Department[]>(departmentList)

  const makeParentCheckboxItem =  (departmentObj: Department, parentIndex: number): React.ReactNode => <FormControlLabel
    label={departmentObj.department}
    control={
        <Checkbox
            checked={departmentObj?.parent_checked || false}
            onChange={(e) => handleParentCheckboxChange(e, parentIndex)}
        />
    }
  />

  const makeSubCheckboxItem =  (departmentObj: Department, parentIndex: number, subIndex: number, isCurrentItemChecked: boolean): React.ReactNode => <FormControlLabel
    label={departmentObj.sub_departments[subIndex]}
    control={
        <Checkbox 
            checked={isCurrentItemChecked}
            onChange={(e) => handleSubCheckboxChange(e, parentIndex, subIndex)}
        />
    }
  />

  const handleParentCheckboxChange = (e: any, parentIndex: number): void => {
    let newDepartments = [...departments];

    let currentDepartmentObj = newDepartments[parentIndex]
    currentDepartmentObj.parent_checked = e.target.checked
    currentDepartmentObj.sub_departments_checked = Array(currentDepartmentObj.sub_departments.length).fill(e.target.checked)

    newDepartments[parentIndex] = currentDepartmentObj
    setDepartments(() => newDepartments)
  }

  const handleSubCheckboxChange = (e: any, parentIndex: number, subIndex: number): void => {
    let newDepartments = [...departments];

    let currentDepartmentObj = newDepartments[parentIndex]
   
    if( Array.isArray(currentDepartmentObj.sub_departments_checked) )
    {
        currentDepartmentObj.sub_departments_checked[subIndex] = e.target.checked

        let allSubChecked: boolean = currentDepartmentObj.sub_departments_checked.every((isSubChecked: boolean) => isSubChecked);
        if(allSubChecked)
        {
            currentDepartmentObj.parent_checked = true;
        }
        else {
            currentDepartmentObj.parent_checked = false;
        }
    }
    else {
        currentDepartmentObj.sub_departments_checked = Array(currentDepartmentObj.sub_departments.length).fill(false)
        currentDepartmentObj.sub_departments_checked[subIndex] = true
    }

    newDepartments[parentIndex] = currentDepartmentObj
    setDepartments(() => newDepartments)

  }

  return (
    <Box sx={{ height: 400, width: '100%' }}>
        <TreeView
            defaultCollapseIcon={<RemoveIcon />}
            defaultExpandIcon={<AddIcon />}
            sx={{ height: 240, flexGrow: 1 }}
        >
            {departments.map((departmentObj: Department, parentIndex: number) => {
                return <TreeItem 
                            nodeId={departmentObj.department} 
                            label={makeParentCheckboxItem(departmentObj, parentIndex)}
                        >
                            {departmentObj.sub_departments.map((sub_department: string, subItemIndex: number) => {
                                const isCurrentItemChecked = Array.isArray(departmentObj.sub_departments_checked) ? departmentObj?.sub_departments_checked[subItemIndex] : false
                                return <TreeItem 
                                    nodeId={sub_department} 
                                    label={makeSubCheckboxItem(departmentObj, parentIndex, subItemIndex, isCurrentItemChecked)} 
                                />
                            })}
                        </TreeItem>
            })}
        </TreeView>
    </Box>
  )
}

export default Departments