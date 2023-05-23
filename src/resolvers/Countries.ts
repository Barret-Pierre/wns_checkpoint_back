import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { Country, CountryInput } from "../entities/Country";
import { datasource } from "../utils/data_scource";

const repository = datasource.getRepository(Country);

@Resolver()
class CountriesResolver {
  @Mutation(() => Country, { nullable: true })
  async createCountry(
    @Arg("data", () => CountryInput) data: CountryInput
  ): Promise<Country | null> {
    try {
      return await repository.save(data);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  @Query(() => Country, { nullable: true })
  async getCountry(
    @Arg("countryCode") countryCode: string
  ): Promise<Country | null> {
    try {
      return await repository.findOneOrFail({ where: { code: countryCode } });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  @Query(() => [Country], { nullable: true })
  async getCountries(): Promise<Country[] | null> {
    try {
      return await repository.find();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  @Query(() => [Country], { nullable: true })
  async getCountriesByContinent(
    @Arg("continentCode") continentCode: string
  ): Promise<Country[] | null> {
    try {
      return await repository.find({ where: { continentCode } });
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export default CountriesResolver;
