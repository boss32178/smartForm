import FormHeader from '../FormHeader/FormHeader';
import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

describe('<FormHeader />', () => {
    it('renders 1 component', () => {
        const component = shallow(<FormHeader/>);
        expect(component).toHaveLength(1);
    })

    it('renders FormHeader component correctly', () => {
        const component = mount(
            <FormHeader />
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
        

    })

});

