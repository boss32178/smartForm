import FormSection from '../FormSection/FormSection';
import FormField from '../FormField/FormField';
import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })
const mockTryGetValue = jest.fn(() => false);

describe('<FormSection />', () => {
    it('renders 1 component', () => {
        const component = shallow(<FormSection></FormSection>);
        expect(component).toHaveLength(1);
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
    })

});

