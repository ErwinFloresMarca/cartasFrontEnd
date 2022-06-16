export default function useGetQueryComposable() {
  const pagination = ref({
    page: 1,
    limit: 5,
    total: 0,
  });

  const paginate = ref(true);
  const order = ref<string | Array<string>>('');
  const where = ref<object>({});
  const fields = ref<object>({});
  const include = ref<Array<object> | undefined>([]);
  const getFilterObject = () => {
    const pagData: { skip?: number; limit?: number } = {};
    if (paginate) {
      pagData.skip = (pagination.value.page - 1) * pagination.value.limit;
      pagData.limit = pagination.value.limit;
    }
    return {
      filter: {
        ...pagData,
        order: order.value,
        where: where.value,
        fields: Object.keys(fields.value).length > 0 ? fields.value : undefined,
        include: include.value,
      },
    };
  };
  return {
    pagination,
    paginate,
    order,
    where,
    fields,
    include,
    getFilterObject,
  };
}
