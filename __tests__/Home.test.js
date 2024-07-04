jest.useFakeTimers()
import renderer from 'react-test-renderer';
import { NavigationContainer } from '@react-navigation/native';
import { Header, BodyHome } from '../src/components';

test('Render Header', () => {
    const tree = renderer.create(<Header />).toJSON();
    expect(tree).toMatchSnapshot();
});

test('Render BodyHome', () => {
    const tree = renderer.create(
        <NavigationContainer>
            <BodyHome />
        </NavigationContainer>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
