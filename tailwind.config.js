
// tailwind.config.js
        module.exports = {
          purge: {
            content: [
              './src/**/*.html',
              './src/**/*.js',
              './src/**/*.jsx',
            ],
            safelist: [
              'bg-blue-500',
              'text-center',
              'hover:opacity-100',
              'lg:text-right',
            ]
          },
          darkMode: "class", // or 'media' or 'class',
          theme: {
            screens: {
              sm: '640px',
              md: '768px',
              lg: '1024px',
              xl: '1280px',
              'xxl': '1536px',
            },
            spacing: {
              px: '1px',
              0: '0px',
              0.5: '0.125rem',
              1: '0.25rem',
              1.5: '0.375rem',
              2: '0.5rem',
              2.5: '0.625rem',
              3: '0.75rem',
              3.5: '0.875rem',
              4: '1rem',
              5: '1.25rem',
              6: '1.5rem',
              7: '1.75rem',
              8: '2rem',
              9: '2.25rem',
              10: '2.5rem',
              11: '2.75rem',
              12: '3rem',
              14: '3.5rem',
              16: '4rem',
              20: '5rem'
            },
            extend: {
              fontSize: {
                sm: ['14px', '20px'],
                base: ['16px', '24px'],
                md: ['18px', '25px'],
                lg: ['20px', '28px'],
                xl: ['24px', '32px'],
              },
              colors: {
                "primary": "#6f72d8",
                "nav-light": "rgb(248, 248, 248)",
                gray: {
                  "9": "#eeeeee",
                  "10": "#f5f5f5",
                },
                "gray-dark": {
                  "9": "#8c8c8c"
                },
                dark: {
                  900: "#131313",
                  800: "#262626",
                  700: "#2d2d2d",
                  600: "#3d3d3d",
                  500: "#484848",
                  400: "#646464",
                }
              },
              width: {
                85: "85px",
                '80%': "80%",
                '95%': "95%",
                '200': "200px",
                '300': '300px'
              },
              height: {
                '200': "200px"
              },
              maxWidth: {
                "full": "100%"
              },
              minWidth: {
                85: "85px",
                100: "100px",
                150: "150px",
                200: "200px",
                300: "300px",
                900: "900px",
                1000: "1000px"
              },
              minHeight: {
                40: "40px"
              },
              zIndex: {
                500: "500",
              }
            },
          },
          variants: {
          //   accessibility: ['responsive', 'focus-within', 'focus'],
          //   alignContent: ['responsive'],
          //   alignItems: ['responsive'],
          //   alignSelf: ['responsive'],
          //   animation: ['responsive'],
          //   appearance: ['responsive'],
          //   backdropBlur: ['responsive'],
          //   backdropBrightness: ['responsive'],
          //   backdropContrast: ['responsive'],
          //   backdropFilter: ['responsive'],
          //   backdropGrayscale: ['responsive'],
          //   backdropHueRotate: ['responsive'],
          //   backdropInvert: ['responsive'],
          //   backdropOpacity: ['responsive'],
          //   backdropSaturate: ['responsive'],
          //   backdropSepia: ['responsive'],
          //   backgroundAttachment: ['responsive'],
          //   backgroundBlendMode: ['responsive'],
          //   backgroundClip: ['responsive'],
          //   backgroundColor: ['responsive',  'hover', 'dark'],
          //   backgroundImage: ['responsive'],
          //   backgroundOpacity: ['responsive', 'hover'],
          //   backgroundPosition: ['responsive'],
          //   backgroundRepeat: ['responsive'],
          //   backgroundSize: ['responsive'],
          //   backgroundOrigin: ['responsive'],
          //   blur: ['responsive'],
          //   borderCollapse: ['responsive'],
          //   borderColor: ['responsive', 'hover'],
          //   borderOpacity: ['responsive',  'hover'],
          //   borderRadius: ['responsive'],
          //   borderStyle: ['responsive'],
          //   borderWidth: ['responsive'],
          //   boxDecorationBreak: ['responsive'],
          //   boxShadow: ['responsive','hover'],
          //   boxSizing: ['responsive'],
          //   brightness: ['responsive'],
          //   clear: ['responsive'],
          //   container: ['responsive'],
          //   contrast: ['responsive'],
          //   cursor: ['responsive'],
          //   display: ['responsive'],
          //   divideColor: ['responsive', 'dark'],
          //   divideOpacity: ['responsive', 'dark'],
          //   divideStyle: ['responsive'],
          //   divideWidth: ['responsive'],
          //   dropShadow: ['responsive'],
          //   fill: ['responsive'],
          //   filter: ['responsive'],
          //   flex: ['responsive'],
          //   flexDirection: ['responsive'],
          //   flexGrow: ['responsive'],
          //   flexShrink: ['responsive'],
          //   flexWrap: ['responsive'],
          //   float: ['responsive'],
          //   fontFamily: ['responsive'],
          //   fontSize: ['responsive'],
          //   fontSmoothing: ['responsive'],
          //   fontStyle: ['responsive'],
          //   fontVariantNumeric: ['responsive'],
          //   fontWeight: ['responsive'],
          //   gap: ['responsive'],
          //   gradientColorStops: ['responsive', 'dark', 'hover', 'focus'],
          //   grayscale: ['responsive'],
          //   gridAutoColumns: ['responsive'],
          //   gridAutoFlow: ['responsive'],
          //   gridAutoRows: ['responsive'],
          //   gridColumn: ['responsive'],
          //   gridColumnEnd: ['responsive'],
          //   gridColumnStart: ['responsive'],
          //   gridRow: ['responsive'],
          //   gridRowEnd: ['responsive'],
          //   gridRowStart: ['responsive'],
          //   gridTemplateColumns: ['responsive'],
          //   gridTemplateRows: ['responsive'],
          //   height: ['responsive'],
          //   hueRotate: ['responsive'],
          //   inset: ['responsive'],
          //   invert: ['responsive'],
          //   isolation: ['responsive'],
          //   justifyContent: ['responsive'],
          //   justifyItems: ['responsive'],
          //   justifySelf: ['responsive'],
          //   letterSpacing: ['responsive'],
          //   lineHeight: ['responsive'],
          //   listStylePosition: ['responsive'],
          //   listStyleType: ['responsive'],
          //   margin: ['responsive'],
          //   maxHeight: ['responsive'],
          //   maxWidth: ['responsive'],
          //   minHeight: ['responsive'],
          //   minWidth: ['responsive'],
          //   mixBlendMode: ['responsive'],
          //   objectFit: ['responsive'],
          //   objectPosition: ['responsive'],
          //   opacity: ['responsive', 'group-hover', 'focus-within', 'hover', 'focus'],
          //   order: ['responsive'],
          //   outline: ['responsive', 'focus-within', 'focus'],
          //   overflow: ['responsive'],
          //   overscrollBehavior: ['responsive'],
          //   padding: ['responsive'],
          //   placeContent: ['responsive'],
          //   placeItems: ['responsive'],
          //   placeSelf: ['responsive'],
          //   placeholderColor: ['responsive', 'dark', 'focus'],
          //   placeholderOpacity: ['responsive', 'dark', 'focus'],
          //   pointerEvents: ['responsive'],
          //   position: ['responsive'],
          //   resize: ['responsive'],
          //   ringColor: ['responsive', 'dark', 'focus-within', 'focus'],
          //   ringOffsetColor: ['responsive', 'dark', 'focus-within', 'focus'],
          //   ringOffsetWidth: ['responsive', 'focus-within', 'focus'],
          //   ringOpacity: ['responsive', 'dark', 'focus-within', 'focus'],
          //   ringWidth: ['responsive', 'focus-within', 'focus'],
          //   rotate: ['responsive', 'hover', 'focus'],
          //   saturate: ['responsive'],
          //   scale: ['responsive', 'hover', 'focus'],
          //   sepia: ['responsive'],
          //   skew: ['responsive', 'hover', 'focus'],
          //   space: ['responsive'],
          //   stroke: ['responsive'],
          //   strokeWidth: ['responsive'],
          //   tableLayout: ['responsive'],
          //   textAlign: ['responsive'],
          //   textColor: ['responsive', 'hover',  'dark'],
          //   textDecoration: ['responsive', 'hover', 'focus'],
          //   textOpacity: ['responsive', 'dark',  'hover', 'focus'],
          //   textOverflow: ['responsive'],
          //   textTransform: ['responsive'],
          //   transform: ['responsive'],
          //   transformOrigin: ['responsive'],
          //   transitionDelay: ['responsive'],
          //   transitionDuration: ['responsive'],
          //   transitionProperty: ['responsive'],
          //   transitionTimingFunction: ['responsive'],
          //   translate: ['responsive', 'hover'],
          //   userSelect: ['responsive'],
          //   verticalAlign: ['responsive'],
          //   visibility: ['responsive'],
          //   whitespace: ['responsive'],
          //   width: ['responsive'],
          //   wordBreak: ['responsive'],
          //   zIndex: ['responsive']
          //
          },
          // plugins: [],
          corePlugins:[
            "alignContent",
            "alignItems",
            "alignSelf",
            "animation",
            // "backdropBlur",
            // "backdropBrightness",
            // "backdropContrast",
            // "backdropFilter",
            // "backdropGrayscale",
            // "backdropHueRotate",
            // "backdropInvert",
            // "backdropOpacity",
            // "backdropSaturate",
            // "backdropSepia",
            // "backgroundAttachment",
            // "backgroundBlendMode",
            // "backgroundClip",
            "backgroundColor",
            // "backgroundImage",
            "backgroundOpacity",
            // "backgroundPosition",
            // "backgroundRepeat",
            // "backgroundSize",
            // "backgroundOrigin",
            "blur",
            "borderCollapse",
            "borderColor",
            "borderOpacity",
            "borderRadius",
            "borderStyle",
            "borderWidth",
            // "boxDecorationBreak",
            "boxShadow",
            "boxSizing",
            // "brightness",
            // "clear",
            // "container",
            // "contrast",
            "cursor",
            "display",
            "divideColor",
            "divideOpacity",
            // "divideStyle",
            "divideWidth",
            "dropShadow",
            // "fill",
            // "filter",
            "flex",
            "flexDirection",
            "flexGrow",
            "flexShrink",
            "flexWrap",
            // "float",
            // "fontFamily",
            "fontSize",
            // "fontSmoothing",
            "fontStyle",
            // "fontVariantNumeric",
            "fontWeight",
            "gap",
            // "gradientColorStops",
            // "grayscale",
            "gridAutoColumns",
            "gridAutoFlow",
            "gridAutoRows",
            "gridColumn",
            "gridColumnEnd",
            "gridColumnStart",
            "gridRow",
            "gridRowEnd",
            "gridRowStart",
            "gridTemplateColumns",
            "gridTemplateRows",
            "height",
            // "hueRotate",
            "inset",
            // "invert",
            // "isolation",
            "justifyContent",
            "justifyItems",
            "justifySelf",
            "letterSpacing",
            "lineHeight",
            // "listStylePosition",
            // "listStyleType",
            "margin",
            "maxHeight",
            "maxWidth",
            "minHeight",
            "minWidth",
            // "mixBlendMode",
            // "objectFit",
            // "objectPosition",
            "opacity",
            "order",
            "outline",
            "overflow",
            "overscrollBehavior",
            "padding",
            "placeContent",
            "placeItems",
            // "placeSelf",
            "placeholderColor",
            "placeholderOpacity",
            "pointerEvents",
            "position",
            "resize",
            // "ringColor",
            // "ringOffsetColor",
            // "ringOffsetWidth",
            // "ringOpacity",
            // "ringWidth",
            // "rotate",
            // "saturate",
            // "scale",
            // "sepia",
            // "skew",
            "space",
            // "stroke",
            // "strokeWidth",
            // "tableLayout",
            "textAlign",
            "textColor",
            "textDecoration",
            "textOpacity",
            "textOverflow",
            "textTransform",
            "transform",
            "transformOrigin",
            // "transitionDelay",
            // "transitionDuration",
            // "transitionProperty",
            // "transitionTimingFunction",
            "translate",
            "userSelect",
            "verticalAlign",
            "visibility",
            "whitespace",
            "width",
            "wordBreak",
            "zIndex",
          ]
        }