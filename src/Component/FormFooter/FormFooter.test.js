import FormFooter from '../FormFooter/FormFooter';
import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })
const mockSubmit = jest.fn();

describe('<FormFooter />', () => {
    it('renders 1 component', () => {
        const component = shallow(<FormFooter />);
        expect(component).toHaveLength(1);
    })

    it('save button calls handleSubmit function on click', () => {
        const component = mount(
            <FormFooter handleSubmit={mockSubmit} />
        );
        expect(component).toHaveLength(1);

        let saveButton = component.find("button").at(2);
        saveButton.simulate('click');
        expect(mockSubmit).toHaveBeenCalledTimes(1);

        component.unmount();
    })

});

