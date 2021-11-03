const { gql } = require("apollo-server");

const typeDefs = gql`
  # Your schema will go here
  # This Query type defines three available queries for clients to execute: launches, launch, and me.
  type Query {
    # The launches query will return an array of all upcoming Launches.
    # launches: [Launch]!
    launches( # replace the current launches query with this one.
      """
      The number of results to show. Must be >= 1. Default = 20
      """
      pageSize: Int
      """
      If you add a cursor here, it will only return results _after_ this cursor
      """
      after: String
    ): LaunchConnection!
    # The launch query will return a single Launch that corresponds to the id argument provided to the query.
    launch(id: ID!): Launch
    # The me query will return details for the User that's currently logged in.
    me: User
  }

  """
  Simple wrapper around our list of launches that contains a cursor to the
  last item in the list. Pass this cursor to the launches query to fetch results
  after these.
  """
  type LaunchConnection { # add this below the Query type as an additional type.
    cursor: String!
    hasMore: Boolean!
    launches: [Launch]!
  }

  # Queries enable clients to fetch data, but not to modify data. To enable clients to modify data, our schema needs to define some mutations.
  # This Mutation type defines three available mutations for clients to execute: bookTrips, cancelTrip, and login.
  type Mutation {
    # The bookTrips mutation enables a logged-in user to book a trip on one or more Launches (specified by an array of launch IDs).
    bookTrips(launchIds: [ID]!): TripUpdateResponse!
    # The cancelTrip mutation enables a logged-in user to cancel a trip that they previously booked.
    cancelTrip(launchId: ID!): TripUpdateResponse!
    # The login mutation enables a user to log in by providing their email address.
    login(email: String): User
  }

  type TripUpdateResponse {
    success: Boolean!
    message: String
    launches: [Launch]
  }

  # An exclamation point (!) after a declared field's type means "this field's value can never be null."
  type Launch {
    id: ID!
    site: String
    mission: Mission
    rocket: Rocket
    isBooked: Boolean!
  }

  type Mission {
    name: String
    missionPatch(size: PatchSize): String
  }

  type Rocket {
    id: ID!
    name: String
    type: String
  }

  type User {
    id: ID!
    email: String!
    trips: [Launch]!
    token: String
  }

  enum PatchSize {
    SMALL
    LARGE
  }
`;

module.exports = typeDefs;
