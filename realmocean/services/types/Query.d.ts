export class Query {
   equal(attribute, value);
   notEqual(attribute, value);
   lessThan(attribute, value);
   lessThanEqual(attribute, value);
   greaterThan(attribute, value);
   greaterThanEqual(attribute, value);
   isNull(attribute);
   isNotNull(attribute);
   between(attribute, start, end);
   startsWith(attribute, value);
   endsWith(attribute, value);
   select(attributes);
   search(attribute, value);
   orderDesc(attribute);
   orderAsc(attribute);
   cursorAfter(documentId);
   cursorBefore(documentId);
   limit(limit);
   offset(offset);
   addQuery(attribute, method, value);
   parseValues(value);
}
