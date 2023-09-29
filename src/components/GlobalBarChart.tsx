import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import {palette, spacing} from '../style';

const data = {
  labels: ['Hetfo', 'Kedd', 'Szerda', 'Csut', 'Pentek', 'Szombat', 'Vasarnap'],
  datasets: [550, 1000, 0, 3500, 4000, 550, 0],
};

const height = 300;
const width = 300;

// const {width} = Dimensions.get('window');

export default function GlobalBarChart() {
  let maxDataValue = Math.max(...data.datasets);
  console.log('--');
  console.log('max', maxDataValue);
  return (
    <View
      style={{
        width: '100%',
        backgroundColor: palette.white,
        height: height,
        padding: spacing.single,
      }}>
      <View
        style={{
          //   marginLeft: spacing.quadruple,
          width: '100%',
          height: '100%',
          borderBottomWidth: 2,
          flexDirection: 'row',
          gap: spacing.singlehalf,
          alignItems: 'flex-end',
          //   paddingHorizontal: spacing.single,
        }}>
        {data.datasets.map((e, index) => {
          //   console.log(height - (height * e) / maxDataValue);
          let a = (e / maxDataValue) * 100;
          console.log(a);
          return (
            <View
              style={{
                // height: height - (height * e) / maxDataValue,
                // height: height - (height  e),
                height: `${(e / maxDataValue) * 100 - spacing.half}%`,
                width: `${100 / 7 - 4}%`,
                backgroundColor: palette.primary,
              }}>
              <View
                style={{
                  position: 'absolute',
                  bottom: index % 2 == 0 ? -30 : -50,
                  width: 60,
                  //   backgroundColor: 'red',
                  //   bottom: -50,
                }}>
                <Text
                  style={
                    {
                      // textAlign: 'center',
                      // width: '100%',
                      // backgroundColor: 'red',
                    }
                  }>
                  {data.labels[index]}
                </Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  top: -20,
                  width: '100%',
                }}>
                <Text
                  style={{
                    width: '100%',
                    textAlign: 'center',
                  }}>
                  {e}
                </Text>
              </View>
            </View>
          );
        })}
        {/* <View
          style={{
            height: 200,
            width: 30,
            backgroundColor: palette.primary,
          }}>
          <View
            style={{
              position: 'absolute',
              bottom: -40,
            }}>
            <Text style={{width: '100%'}}>Hátfő</Text>
          </View>
        </View>
        <View
          style={{
            height: 100,
            width: 30,
            backgroundColor: palette.primary,
          }}>
          <View
            style={{
              position: 'absolute',
              bottom: -40,
            }}>
            <Text style={{width: '100%'}}>Kedd</Text>
          </View>
        </View>
        <View
          style={{
            height: 100,
            width: 30,
            backgroundColor: palette.primary,
          }}>
          <View
            style={{
              position: 'absolute',
              bottom: -40,
            }}>
            <Text style={{width: '100%'}}>Szerda</Text>
          </View>
        </View> */}
      </View>
    </View>
  );
}

{
  /* <View
            style={{
              position: 'absolute',
              bottom: -30,
              left: 0,
              //   backgroundColor: 'red',
              width: 25,
            }}>
            <Text>Hátfő</Text>
          </View><View
            style={{
              position: 'absolute',
              bottom: -30,
              left: 0,
              //   backgroundColor: 'red',
              width: 25,
            }}>
            <Text>Hátfő</Text>
          </View> */
}

// import React from 'react';
// import {View} from 'react-native';
// import Svg, {Rect, Text} from 'react-native-svg';

// const data = [10, 20, 15, 30, 25]; // Example data points
// const width = 300;
// const height = 200;

// export default function GlobalBarChart() {
//   const barWidth = width / data.length;
//   const maxDataValue = Math.max(...data);

//   return (
//     <View style={{width, height}}>
//       <Svg width={width} height={height}>
//         {data.map((value, index) => (
//           <>
//             <Rect
//               key={index}
//               x={index * barWidth}
//               y={height - (height * value) / maxDataValue}
//               width={barWidth}
//               height={(height * value) / maxDataValue}
//               fill="#3498db" // Change the bar color as needed
//             />
//             <Text>asad</Text>
//           </>
//         ))}
//       </Svg>
//     </View>
//   );
// }
