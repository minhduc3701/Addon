# List custom

## Usage

[!code-javascript[ListImport](../../src/Dependencies/ListCustom/examples/ListExamples.tsx?name=ListImport)]

## List property

- Dark mode
  [!code-javascript[ListDarkMode](../../src/Dependencies/ListCustom/examples/ListExamples.tsx?name=ListDarkMode)]

- Get items selected
  [!code-javascript[ListSelected](../../src/Dependencies/ListCustom/examples/ListExamples.tsx?name=ListSelected)]

- Hanlde row click
  [!code-javascript[ListRowClick](../../src/Dependencies/ListCustom/examples/ListExamples.tsx?name=ListRowClick)]

- Function fetch data lazy loading
  [!code-javascript[ListObjectGetData](../../src/Dependencies/ListCustom/examples/ListExamples.tsx?name=ListObjectGetData)]

- Get filter object
  [!code-javascript[ListGetFilterObject](../../src/Dependencies/ListCustom/examples/ListExamples.tsx?name=ListGetFilterObject)]

- Handle clear filter
  [!code-javascript[ListClearFilter](../../src/Dependencies/ListCustom/examples/ListExamples.tsx?name=ListClearFilter)]

- Get sort object and filter object
  [!code-javascript[ListQueryObject](../../src/Dependencies/ListCustom/examples/ListExamples.tsx?name=ListQueryObject)]

- Group items
  [!code-javascript[ListGroup](../../src/Dependencies/ListCustom/examples/ListExamples.tsx?name=ListGroup)]

## Example:

[!code-javascript[ListExample](../../src/Dependencies/ListCustom/examples/ListExamples.tsx?name=ListExample)]

**Example list props**
[!code-javascript[ListProps](../../src/Dependencies/ListCustom/ListStyle.ts?name=ListProps)]

**Example list props sort object**
[!code-javascript[ListSortObject](../../src/Dependencies/ListCustom/ListStyle.ts?name=ListSortObject)]

**Example list props filter object**
[!code-javascript[ListFilterObject](../../src/Dependencies/ListCustom/ListStyle.ts?name=ListFilterObject)]

**Example list props columns**
[!code-javascript[ListColumns](../../src/Dependencies/ListCustom/ListStyle.ts?name=ListColumns)]

**Example groups props columns**
[!code-javascript[IGroupsProps](../../src/Dependencies/GroupedList/GroupedList.types.d.ts?name=IGroupsProps)]

## Note

- Loading property decide when you using sort & filter by typescript or api
