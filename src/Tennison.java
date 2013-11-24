import java.io.BufferedReader;
import java.io.FileReader;
import java.util.Scanner;

/**
 * Tennison
 * User: rduga
 * Date: 11/22/13
 * Time: 3:43 PM
 */
public class Tennison {

    static int K = -1;
    static double ps = -1;
    static double pr = -1;

    static double pu = -1;
    static double pw = -1;
    static double pd = -1;
    static double pl = -1;


    public static void main(String[] args) throws Exception {
        BufferedReader reader = new BufferedReader(new FileReader("Tennison1.input"));

        int T = Integer.parseInt(reader.readLine());
        System.out.println(T);

        for (int i = 1; i <= T; ++i) {
            // K ps, pr, pi, pu, pw, pd, pl

            String line = reader.readLine();
            Scanner scanner = new Scanner(line);
            K = scanner.nextInt(); // number of sets, <= 100

            // FIXME: is double good enough?, not to use BigDecimal?
            ps = scanner.nextDouble(); // win set when is sunny
            pr = scanner.nextDouble(); // win set when is rain probability

            double pi = scanner.nextDouble(); // chance of sun to be in first set

            pu = scanner.nextDouble(); // up/increase of sun probability
            pw = scanner.nextDouble(); // probability of up/increase of sun probability

            double pd = scanner.nextDouble(); // decrease of sun probablity
            double pl = scanner.nextDouble(); // probablity of decrease of sun probablity

            double pwin = -1;

            if (K == 1) {
                pwin = probWin(1, 0, true, pi); // pi*ps + (1-pi)*pr;
            } else {
                pwin = probWin(1, 0, true, pi) + probWin(0, 1, false, pi);
            }

            // ps > pr

            System.out.println(String.format("%d %f %f %f %f %f %f %f", K, ps, pr, pi, pu, pw, pd, pl));

            System.out.println(String.format("Case #%d: %f", i, pwin));
        }

    }

    static double probWin(int tennison, int other, boolean won, double pi) {
        // after playing the set

        if (pi > 1l) {
            pi = 1l;
        } else if (pi < 0) {
            pi = 0l;
        }

        double oldpi = pi;
        double pwins = pi * ps + (1l - pi) * pr;
        // probability that he wins
//        pi =

        if (pwins > 1l) {
            pwins = 1l;
        } else if (pwins < 0) {
            pwins = 0l;
        }

//        System.out.println(String.format("%d:%d", tennison, other));

        if (tennison == K) {
            return pwins;
        }

        double newpi;

        if (won) {
            // pu pw
            newpi = pi + pu;
            if (newpi > 1l) {
                newpi = 1l;
            }

            if (other < K - 1) {
                double v = pwins * (
                        probWin(tennison + 1, other, true, newpi) * pw
                                + probWin(tennison + 1, other, true, pi) * (1 - pw)
                ) + (1l - pwins) * (
                        +probWin(tennison, other + 1, false, newpi) * pw
                                + probWin(tennison, other + 1, false, pi) * (1 - pw)
                );

                if (v > 1) {
                    return 1l;
                } else if (v < 0) {
                    return 0l;
                }

                return v;
            } else if (other == K - 1) {
                double v = pwins * (
                        probWin(tennison + 1, other, true, newpi) * pw
                                + probWin(tennison + 1, other, true, pi) * (1 - pw)
                );

                if (v > 1) {
                    return 1l;
                } else if (v < 0) {
                    return 0l;
                }

                return v;
            }
        } else {
            // pd pl
            newpi = pi - pd;
            if (newpi < 0l) {
                newpi = 0l;
            }

            if (other < K - 1) {
                double v = pwins * (
                        probWin(tennison + 1, other, true, newpi) * pl
                                + probWin(tennison + 1, other, true, pi) * (1 - pl)
                ) + (1l - pwins) * (
                        +probWin(tennison, other + 1, false, newpi) * pl
                                + probWin(tennison, other + 1, false, pi) * (1 - pl)
                );

                if (v > 1) {
                    return 1l;
                } else if (v < 0) {
                    return 0l;
                }

                return v;
            } else if (other == K - 1) {
                double v = pwins * (
                        probWin(tennison + 1, other, true, newpi) * pl
                                + probWin(tennison + 1, other, true, pi) * (1 - pl)
                );

                if (v > 1) {
                    return 1l;
                } else if (v < 0) {
                    return 0l;
                }

                return v;
            }
        }

        return 0;
    }
}
