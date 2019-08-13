import CalendarDropDown from './CalendarDropDown';
import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import './../../../General/UnitTestSetup.js'

const mockTryGetValue = jest.fn(() => false);

describe('<CalendarDropDown/>', () => {
    it('renders 1 <CalendarDropDown/>> component', () => {
        const component = shallow(<CalendarDropDown name={"testDropDown"}/>);
        expect(component).toHaveLength(1);
        const div = component.find('div').first();        
        expect(div.prop("name")).toEqual("testDropDown");
    });

    it('renders with Calendar open', () => {

        let startDate = new Date(2018,5,2);
        const setShowCalendar = jest.fn(); 
        const saveCalendarSelection = jest.fn(); 

        const component = mount(<CalendarDropDown name="testDropDown" value={startDate} setShowCalendar={setShowCalendar} onCalendarSelection={saveCalendarSelection} className=" mystyles " />);
        expect(component).toHaveLength(1);

        const divItem = component.find('div').first();  
        expect(divItem.prop("name")).toEqual("testDropDown");
        expect(divItem.hasClass("mystyles")).toEqual(true);

        let calItem = component.find('div.react-calendar');
        expect(calItem).toHaveLength(1);

        component.unmount();

    });

    it('renders with Calendar open, but calls to select Today', () => {

        let startDate = new Date(2018,5,2);
        const setShowCalendar = jest.fn(); 
        const saveCalendarSelection = jest.fn(); 

        const component = mount(<CalendarDropDown name="testDropDown" value={startDate} setShowCalendar={setShowCalendar} onCalendarSelection={saveCalendarSelection} className=" mystyles " />);
        expect(component).toHaveLength(1);
        // console.log(component.html());

        const divItem = component.find('div').first();  
        expect(divItem.prop("name")).toEqual("testDropDown");
        expect(divItem.hasClass("mystyles")).toEqual(true);

        let calItem = component.find('div.react-calendar');
        expect(calItem).toHaveLength(1);

        let todayButton = component.find("div [type='button'][value='Today']");

        todayButton.simulate('click');
        expect(saveCalendarSelection).toHaveBeenCalledTimes(1);
        let todayDateString = new Date().toISOString().slice(0,10);
        expect(saveCalendarSelection.mock.calls[0][0]).toEqual(todayDateString);
       
        component.unmount();

    });


    it('renders with Calendar open, but calls setShowCalendar to close it', () => {

        let startDate = new Date(2018,5,2);
        const setShowCalendar = jest.fn(); 
        const saveCalendarSelection = jest.fn(); 

        const component = mount(<CalendarDropDown name="testDropDown" value={startDate} setShowCalendar={setShowCalendar} onCalendarSelection={saveCalendarSelection} className=" mystyles " />);
        expect(component).toHaveLength(1);
        // console.log(component.html());

        const divItem = component.find('div').first();  
        expect(divItem.prop("name")).toEqual("testDropDown");
        expect(divItem.hasClass("mystyles")).toEqual(true);

        let calItem = component.find('div.react-calendar');
        expect(calItem).toHaveLength(1);

        let closeButton = component.find("div [type='button'][value='Close']");
        closeButton.simulate('click');
        expect(setShowCalendar).toHaveBeenCalledTimes(1);
        
        component.unmount();

    });

});