import { z, ZodIssueCode, ZodSchema } from 'zod';

// 辅助函数：生成带错误信息的Zod字符串校验
function createStringSchemaWithError(
    refineCondition: (val: string | undefined) => boolean,
    errorMessage: string | ((...args: any[]) => string),
    options: { maxLength?: number } = {}
): ZodSchema<string | undefined> {
    let schema = z.string()
      .transform(val => val?.trim());
    if (typeof errorMessage === 'function') {
        schema = schema.refine(refineCondition, { message: errorMessage });
    } else {
        schema = schema.refine(refineCondition, { message: errorMessage });
    }
    if (options.maxLength) {
        schema = schema.max(options.maxLength);
    }
    return schema;
}


// 带空格去除的必填字符串校验
export function RuleRequired(
    errorMessageGen?: (fieldName: string) => string,
    fieldName = '',
    maxLength?: number
) {
    const errorMessage = errorMessageGen
      ? errorMessageGen(fieldName)
      : 'This field is required';
    return z.preprocess(
        val => val ?? '',
        createStringSchemaWithError(
            val => val && val.length > 0,
            errorMessage,
            { maxLength }
        )
    );
}

// 可选字符串校验
export function RuleOptional(
    errorMessageGen?: (() => string),
    maxLength?: number
) {
    const errorMessage = errorMessageGen?.() || '';
    return z.preprocess(
        val => val ?? '',
        createStringSchemaWithError(
            () => true,
            errorMessage,
            { maxLength }
        ).optional()
    );
}

// 邮箱校验
export function RuleEmail(
    errorMessageGenRequired?: (fieldName: string) => string,
    fieldName = '',
    required = true
) {
    const requiredErrorMessage = errorMessageGenRequired
      ? errorMessageGenRequired(fieldName)
      : 'This field is required';
    return z.preprocess(
        val => val ?? '',
        z.string()
          .transform(val => val?.trim())
          .refine(val =>!required || (val && val.length > 0), { message: requiredErrorMessage })
          .pipe(
                z.string().email({ message: 'Please enter a valid email' }).optional()
            )
    );
}

// 多个邮箱校验
export function RuleMutilEmail(
    errorMessageToManyGen?: (maxLength: number) => string,
    errorMessageFormatGen?: () => string,
    maxLength = 49
) {
    const errorToMany = errorMessageToManyGen? errorMessageToManyGen(maxLength) : `Maximum ${maxLength} emails allowed`;
    const errorFormat = errorMessageFormatGen? errorMessageFormatGen() : 'Please check your email address';

    return z.preprocess(
        val => val?? '',
        z.string()
          .transform(val => val?.trim())
          .superRefine((val, ctx) => {
                if (!val) {
                    return;
                }

                const emails = val.trim().split(';').filter((email: string) => email.trim()!== '');

                if (emails.length > maxLength) {
                    ctx.addIssue({
                        code: ZodIssueCode.custom,
                        message: errorToMany
                    });
                    return;
                }

                for (const email of emails) {
                    const trimmedEmail = email.trim();
                    if (!z.string().email().safeParse(trimmedEmail).success) {
                        ctx.addIssue({
                            code: ZodIssueCode.custom,
                            message: errorFormat
                        });
                        return;
                    }
                }
            })
          .optional().nullable()
    );
}

// 电话号码校验
export function RulePhone(
    errorMessageGenRequired?: (fieldName: string) => string,
    fieldName = '',
    required = true
) {
    const requiredErrorMessage = errorMessageGenRequired
      ? errorMessageGenRequired(fieldName)
      : 'This field is required';

    const phoneSchema = z.string()
      .transform(val => val?.trim())
      .pipe(
            z.string()
              .min(6, { message: 'Input length should be between 6 and 20' })
              .max(20, { message: 'Input length should be between 6 and 20' })
              .regex(/^\d+$/, { message: 'Please enter a valid phone number' })
        );
    return z.preprocess(
        val => val?? '',
        required? phoneSchema.refine(val => val && val.length > 0, { message: requiredErrorMessage }) : phoneSchema.optional()
    );
}

// 数字校验
export function RuleNumber(
    errorMessageGen?: (fieldName: string) => string,
    fieldName = '',
    min?: number,
    max?: number,
    required = true
) {
    const baseErrorMessage = errorMessageGen? errorMessageGen(fieldName) : 'This field is required';
    let schema = z.number({
        invalid_type_error: baseErrorMessage
    });
    if (min!== undefined) {
        schema = schema.min(min, { message: `Number must be greater than ${min}` });
    }
    if (max!== undefined) {
        schema = schema.max(max, { message: `Number must be less than ${max}` });
    }
    if (!required) {
        return z.preprocess(
            val => val === '' || val === null? undefined : val,
            z.union([schema, z.literal(undefined)])
        );
    }
    return schema;
}
