/** Hooks */
import { lazy, useState } from 'react';
import useLocalStorage from 'use-local-storage';
import useMeals from '../hooks/useMeals';

/** Components */
import {
  Button,
  Card,
  Container,
  Grid,
  Input,
  Loading,
  Row,
  Spacer,
  Text
} from '@nextui-org/react';

/** Lottie */
import { Player } from '@lottiefiles/react-lottie-player';

/** Dynamic */
const MealCardComponent = lazy(() =>
  import('./MealCard').then(module => ({ default: module.MealCard }))
);

export function Home() {
  const [searchParam, setSearchParam] = useLocalStorage('searchParam', '');

  const [inputValue, setInputValue] = useState(searchParam);
  const [searchValue, setSearchValue] = useState(searchParam);

  const { data: meals, isFetching } = useMeals(searchValue);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSearchValue(inputValue);
    setSearchParam(inputValue);
  };

  return (
    <Container xl as="main" display="flex" justify="center">
      <Grid.Container gap={2}>
        <Grid xs={12}>
          <Card>
            <Row justify="center" align="center">
              <Text h1>Meal App</Text>
            </Row>
            <Row justify="center" css={{ mb: 24 }}>
              <Player
                // TODO: Move to env file or config file
                src="https://assets1.lottiefiles.com/packages/lf20_kplouxqz.json"
                loop
                autoplay
                style={{ height: 80, width: 80 }}
              />
            </Row>
            <Row justify="center" align="center" css={{ mb: 16 }}>
              <form onSubmit={handleSearch}>
                <Container display="flex">
                  <Input
                    aria-label="Search"
                    type="search"
                    placeholder="Search for meals"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                  />
                  <Spacer x={1} />
                  <Button type="submit">Search</Button>
                </Container>
              </form>
            </Row>
          </Card>
        </Grid>

        {isFetching ? (
          <Container display="flex" justify="center" css={{ mt: 80 }}>
            <Loading size="xl" />
          </Container>
        ) : (
          <Grid.Container gap={3}>
            {meals?.map(meal => (
              <MealCardComponent
                key={meal.idMeal}
                idMeal={meal.idMeal}
                strMealThumb={meal.strMealThumb}
                strMeal={meal.strMeal}
              />
            ))}
          </Grid.Container>
        )}
      </Grid.Container>
    </Container>
  );
}
