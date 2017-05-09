class Replicant.Location
  constructor: (href) ->
    @element = document.createElement("a")
    @element.href = href?.toString()

  valueOf: ->
    @href

  toString: ->
    @href

  propertyNames = [
    "href", "protocol", "host", "hostname",
    "port", "pathname", "search", "hash",
    "username", "password"
  ]

  @createProperty = (name) ->
    Object.defineProperty @prototype, name,
      get: -> @element[name]
      set: (value) -> @element[name] = value

  @createProperty name for name in propertyNames
