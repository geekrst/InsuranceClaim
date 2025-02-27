using InsuranceClaim.Server.Data;
using InsuranceClaim.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InsuranceClaim.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InsuranceClaimController : ControllerBase
    {
        private readonly InsuranceClaimDBContext _insuranceClaimDBContext;

        public InsuranceClaimController(InsuranceClaimDBContext insuranceClaimDBContext)
        {
            _insuranceClaimDBContext = insuranceClaimDBContext;
        }



        [HttpGet("Reserves")]
        public async Task<IActionResult> GetAllReserves()
        {
            var reserves = await _insuranceClaimDBContext.ReserveModel.OrderBy(r => r.StatusDate).ToListAsync();
            return Ok(reserves);
        }

        [HttpGet("Reserves/Approvals")]
        public async Task<IActionResult> GetAllReservesForApproval()
        {
            var filteredReserves = await _insuranceClaimDBContext.ReserveModel.Where(r => r.Status == "Ready to Approve").OrderBy(r => r.StatusDate).ToListAsync();
            return Ok(filteredReserves);
        }

        [HttpGet("Reserves/Approved")]
        public async Task<IActionResult> GetApprovedReserves()
        {
            var filteredReserves = await _insuranceClaimDBContext.ReserveModel.Where(r => r.Status == "Approved").OrderBy(r => r.StatusDate).ToListAsync();
            return Ok(filteredReserves);
        }

        [HttpGet("Reserve/{id:int}")]
        public async Task<IActionResult> GetReserve([FromRoute] int id)
        {
            var reserve = await _insuranceClaimDBContext.ReserveModel.FirstOrDefaultAsync(r => r.Id == id);
            if (reserve == null)
            {
                return NotFound();
            }
            return Ok(reserve);
        }

        [HttpGet("LatestReserve")]
        public async Task<IActionResult> GetLatestReserve()
        {
            var reserve = await _insuranceClaimDBContext.ReserveModel.Where(r=>r.Status=="Approved").OrderByDescending(r=>r.StatusDate).FirstOrDefaultAsync();
            if (reserve == null)
            {
                return NotFound();
            }
            return Ok(reserve);
        }
        [HttpPost("Reserve/add")]
        public async Task<IActionResult> AddReserve([FromBody] AddReserveRequest reserveModelrequest)
        {

            var previousNewReserves = await _insuranceClaimDBContext.ReserveModel.Where(r => r.Status == "New").ToListAsync();
            var countPreviousNewReserves = previousNewReserves.Count;

            if (countPreviousNewReserves > 0)
            {
                previousNewReserves.ForEach(pnr =>
                {
                    pnr.Status = "OverRidden";
                    pnr.IsOverRidden = true;
                });
                await _insuranceClaimDBContext.SaveChangesAsync();

            }

            ReserveModel reserveToAdd = new ()
            {
                ReserveDamage = reserveModelrequest.ReserveDamage,
                ReserveClaimantCost = reserveModelrequest.ReserveClaimantCost,
                ReserveDefenceCost = reserveModelrequest.ReserveDefenceCost,
                Status = "New",
                StatusDate = DateTime.Now
            };

            await _insuranceClaimDBContext.ReserveModel.AddAsync(reserveToAdd);
            await _insuranceClaimDBContext.SaveChangesAsync();
            return Ok(reserveModelrequest);
        }

        [HttpPut("Reserve/edit/{id:int}")]
        public async Task<IActionResult> UpdateReserve([FromRoute] int id, ReserveModel updateReserveModelRequest)
        {
            var reserve = await _insuranceClaimDBContext.ReserveModel.FindAsync(id);
            if (reserve == null)
            {
                return NotFound();
            }

            reserve.ReserveDamage = updateReserveModelRequest.ReserveDamage;
            reserve.ReserveClaimantCost = updateReserveModelRequest.ReserveClaimantCost;
            reserve.ReserveDefenceCost = updateReserveModelRequest.ReserveDefenceCost;
            reserve.Status = updateReserveModelRequest.Status;
            reserve.StatusDate = DateTime.Now;


            await _insuranceClaimDBContext.SaveChangesAsync();
            return Ok(reserve);
        }

        [HttpPut("Reserve/readyToApprove/{id:int}")]
        public async Task<IActionResult> UpdateReserveReadyToApprove([FromRoute] int id, ReserveModel updateReserveModelRequest)
        {
            var reserve = await _insuranceClaimDBContext.ReserveModel.FindAsync(id);
            if (reserve == null)
            {
                return NotFound();
            }
            reserve.ReserveDamage = updateReserveModelRequest.ReserveDamage;
            reserve.ReserveClaimantCost = updateReserveModelRequest.ReserveClaimantCost;
            reserve.ReserveDefenceCost = updateReserveModelRequest.ReserveDefenceCost;
            reserve.Status = "Ready to Approve";
            reserve.IsInApproval = true;
            reserve.StatusDate = DateTime.Now;
            

            await _insuranceClaimDBContext.SaveChangesAsync();
            return Ok(reserve);
        }

        [HttpGet("Payments")]
        public async Task<IActionResult> GetAllPayments()
        {
            var payments = await _insuranceClaimDBContext.PaymentModel.OrderBy(p => p.StatusDate).ToListAsync();
            return Ok(payments);
        }

        [HttpGet("Payments/Approvals")]
        public async Task<IActionResult> GetAllPaymentsForApproval()
        {
            var filteredPayments = await _insuranceClaimDBContext.PaymentModel.Where(p => p.Status == "Ready to Approve").OrderBy(p => p.StatusDate).ToListAsync();
            return Ok(filteredPayments);
        }

        [HttpGet("Payments/Approved")]
        public async Task<IActionResult> GetApprovedPayments()
        {
            var filteredPayments = await _insuranceClaimDBContext.PaymentModel.Where(p => p.Status == "Approved").OrderBy(p => p.StatusDate).ToListAsync();
            return Ok(filteredPayments);
        }

        [HttpGet("Payment/{id:int}")]
        public async Task<IActionResult> GetPayment([FromRoute] int id)
        {
            var payment = await _insuranceClaimDBContext.PaymentModel.FirstOrDefaultAsync(r => r.Id == id);
            if (payment == null)
            {
                return NotFound();
            }
            return Ok(payment);
        }

        [HttpPost("Payment/add")]
        public async Task<IActionResult> AddPayment([FromBody] AddPaymentRequest paymentModelrequest)
        {
            var approvedReserveCount = _insuranceClaimDBContext.ReserveModel.Where(x => x.Status == "Approved").Count();
            if (approvedReserveCount > 0)
            {
                PaymentModel paymentToAdd = new() 
                {
                    PaymentDamage = paymentModelrequest.PaymentDamage,
                    PaymentClaimantCost = paymentModelrequest.PaymentClaimantCost,
                    PaymentDefenceCost = paymentModelrequest.PaymentDefenceCost,
                    PaymentType= paymentModelrequest.PaymentType,
                    Status = "New",
                    StatusDate = DateTime.Now
                };

                await _insuranceClaimDBContext.PaymentModel.AddAsync(paymentToAdd);
                await _insuranceClaimDBContext.SaveChangesAsync();
                return Ok(paymentToAdd);
            }

            return BadRequest("No reserves found to associate the payment.");
        }

        [HttpPut("Payment/edit/{id:int}")]
        public async Task<IActionResult> UpdatePayment([FromRoute] int id, PaymentModel updatePaymentModelRequest)
        {
            var payment = await _insuranceClaimDBContext.PaymentModel.FindAsync(id);
            if (payment == null)
            {
                return NotFound();
            }
            payment.PaymentDamage = updatePaymentModelRequest.PaymentDamage;
            payment.PaymentClaimantCost = updatePaymentModelRequest.PaymentClaimantCost;
            payment.PaymentDefenceCost = updatePaymentModelRequest.PaymentDefenceCost;
            payment.PaymentType = updatePaymentModelRequest.PaymentType;
            payment.Status = updatePaymentModelRequest.Status;
            payment.StatusDate = DateTime.Now;

            await _insuranceClaimDBContext.SaveChangesAsync();
            return Ok(payment);
        }

        [HttpPut("Payment/readyToApprove/{id:int}")]
        public async Task<IActionResult> UpdatePaymentReadyToApprove([FromRoute] int id, PaymentModel updatePaymentModelRequest)
        {
            var payment = await _insuranceClaimDBContext.PaymentModel.FindAsync(id);
            if (payment == null)
            {
                return NotFound();
            }
            //payment.PaymentDamage = updatePaymentModelRequest.PaymentDamage;
            //payment.PaymentClaimantCost = updatePaymentModelRequest.PaymentClaimantCost;
            //payment.PaymentDefenceCost = updatePaymentModelRequest.PaymentDefenceCost;
            //payment.PaymentType = updatePaymentModelRequest.PaymentType;

       
            var countApprovedReserve = _insuranceClaimDBContext.ReserveModel.Where(r => r.Status == "Approved").Count();

            if (countApprovedReserve > 0)
            {
                payment.Status = "Ready to Approve";
                payment.IsInApproval = true;
                payment.StatusDate = updatePaymentModelRequest.StatusDate;
            }

            await _insuranceClaimDBContext.SaveChangesAsync();
            return Ok(payment);
        }

        [HttpPut("Payment/updateWithReserve/{id:int}")]
        public async Task<IActionResult> UpdatePaymentWithReserve([FromRoute] int id)
        {

            var paymentRequest = await _insuranceClaimDBContext.PaymentModel.FindAsync(id);
            if (paymentRequest == null)
            {
                return NotFound();
            }

            var latestReserve = _insuranceClaimDBContext.ReserveModel.Where(r => r.Status == "Approved").OrderByDescending(p => p.StatusDate).FirstOrDefault();

            if (latestReserve == null)
            {
                return NotFound();
            }

            if (paymentRequest.PaymentType == "Paid")
            {
                latestReserve.PaidDamage += paymentRequest.PaymentDamage;
                latestReserve.PaidClaimantCost += paymentRequest.PaymentClaimantCost;
                latestReserve.PaidDefenceCost += paymentRequest.PaymentDefenceCost;

                latestReserve.ReserveDamage -= paymentRequest.PaymentDamage;
                latestReserve.ReserveClaimantCost -= paymentRequest.PaymentClaimantCost;
                latestReserve.ReserveDefenceCost -= paymentRequest.PaymentDefenceCost;

              
            }
            else if (paymentRequest.PaymentType == "Recovery")
            {
                latestReserve.PaidDamage -= paymentRequest.PaymentDamage;
                latestReserve.PaidClaimantCost -= paymentRequest.PaymentClaimantCost;
                latestReserve.PaidDefenceCost -= paymentRequest.PaymentDefenceCost;

                latestReserve.ReserveDamage += paymentRequest.PaymentDamage;
                latestReserve.ReserveClaimantCost += paymentRequest.PaymentClaimantCost;
                latestReserve.ReserveDefenceCost += paymentRequest.PaymentDefenceCost;
            }

            latestReserve.IncurredDamage = latestReserve.ReserveDamage + latestReserve.PaidDamage;
            latestReserve.IncurredClaimantCost = latestReserve.ReserveClaimantCost + latestReserve.PaidClaimantCost;
            latestReserve.IncurredDefenceCost = latestReserve.ReserveDefenceCost + latestReserve.PaidDefenceCost;

            await _insuranceClaimDBContext.SaveChangesAsync();
            return Ok(latestReserve);
        }


    }
}



