
export function sql(sql?: string) {
	return function (target: object, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
		descriptor.value = async function (...params: any[]): Promise<any> {
			//const conn = ClsContext.Connection;
			//const paramNormalized = normalizeParams(params);
			//const result = await conn.execute(sql, paramNormalized);
			//const rt = convertDataTypes(result);
			return null;
		};
		return descriptor;
	};
}
