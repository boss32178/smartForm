import SmartForm from './SmartForm';
import FormSection from '../FormSection/FormSection';
import FormHeader from '../FormHeader/FormHeader';
import FormFooter from '../FormFooter/FormFooter';
import FormField from '../FormField/FormField';
import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })
const mockTryGetValue = jest.fn(() => false);
const mockSubmit = jest.fn();

describe('<SmartForm />', () => {
    it('renders 1 component', () => {
        const component = shallow(<SmartForm />);
        expect(component).toHaveLength(1);
    })

    it('renders FormHeader component correctly', () => {
        const component = mount(
            <FormHeader  />
        );
        expect(component).toHaveLength(1);
        const headerContent = component.find('header');
        const content = headerContent.children();
        expect(content).toHaveLength(3);
        expect(headerContent.find('div').at(0).hasClass("leftCol")).toEqual(true);
        expect(headerContent.find('div').at(1).hasClass("rightCol")).toEqual(true);
        expect(headerContent.find('div').at(2).hasClass("clear")).toEqual(true);

        const letters = headerContent.find('div').at(1);
        expect(letters.find('li')).toHaveLength(3);
        expect(letters.find('button')).toHaveLength(3);

        const pager = headerContent.find('div').at(0);
        expect(pager.find('li')).toHaveLength(1);
        expect(pager.find('button')).toHaveLength(0);

        component.unmount();
    })

    it('renders FormFooter component correctly', () => {
        const component = mount(
            <FormFooter handleSubmit={mockSubmit} />
        );
        expect(component).toHaveLength(1);
        expect(component.prop("handleSubmit")).toEqual(mockSubmit);

        let saveButton = component.find("button").at(2);
        saveButton.simulate('click');
        expect(mockSubmit).toHaveBeenCalledTimes(1);

        component.unmount();
    })

    it('renders FormSection component correctly', () => {
        const component = mount(
            <FormSection headerName="Test Header">
                <FormField isLocked={false} fieldType={"Currency"} value={"1"} name={"currency"}
                    onSetLocked={mockTryGetValue} isLockable={true} />
                <FormField isLocked={false} fieldType={"Currency"} value={"1"} name={"currency"}
                    onSetLocked={mockTryGetValue} isLockable={true} />
            </FormSection>
        );
        expect(component).toHaveLength(1);
        expect(component.prop('headerName')).toEqual('Test Header');

        const sectionContent = component.find('section');
        const content = sectionContent.children();
        expect(content).toHaveLength(3);
        const childrenProps = sectionContent.find('div').first();
        expect(childrenProps).toEqual({ ...childrenProps });
        expect(childrenProps.hasClass("innerPadding")).toEqual(true);
        const formFieldChildren = childrenProps.find('Memo(FormField)');
        expect(formFieldChildren).toHaveLength(2);

        component.unmount();
    })
    
});

