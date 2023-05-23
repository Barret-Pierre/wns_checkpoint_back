import { Query, Resolver } from "type-graphql";

@Resolver()
class CountriesResolver {
  @Query(() => String)
  async countries(): Promise<string> {
    return "Hello there";
  }
}

export default CountriesResolver;
